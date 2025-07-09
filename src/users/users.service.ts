import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { User } from './user.entity';
import { Permission } from '../permissions/permission.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly userRepo: Repository<User>,
        @InjectRepository(Permission)
        private readonly permissionRepo: Repository<Permission>,
    ) { }

    // Find all users
    async findAll(): Promise<User[]> {
        return this.userRepo.find();
    }

    // Find one user by ID
    async findOne(id: string): Promise<User> {
        const user = await this.userRepo.findOne({
            where: { id },
            relations: ['permissions'],
        });
        if (!user) throw new NotFoundException('User not found');
        return user;
    }

    // Find user by email (already implemented)
    async findByEmail(email: string): Promise<User | null> {
        return this.userRepo.findOne({
            where: { email },
            relations: ['permissions'],
        });
    }

    // Create a new user
    async create(data: {
        email: string;
        password: string;
        permissions?: string[];
    }): Promise<User> {
        const existing = await this.userRepo.findOneBy({ email: data.email });
        if (existing) throw new BadRequestException('Email already exists');

        const hashedPassword = await bcrypt.hash(data.password, 10);

        let permissions: Permission[] = [];
        if (data.permissions && data.permissions.length > 0) {
            permissions = await this.permissionRepo.find({
                where: { name: In(data.permissions) },
            });
        }

        const user = this.userRepo.create({
            email: data.email,
            password: hashedPassword,
            permissions,
        });

        return this.userRepo.save(user);
    }

    // Update existing user
    async update(id: string, data: Partial<{ email: string; password: string; permissions: string[] }>): Promise<User> {
        const user = await this.findOne(id);

        if (data.email) {
            const exists = await this.userRepo.findOneBy({ email: data.email });
            if (exists && exists.id !== id) {
                throw new BadRequestException('Email already exists');
            }
            user.email = data.email;
        }

        if (data.password) {
            user.password = await bcrypt.hash(data.password, 10);
        }

        if (data.permissions) {
            user.permissions = await this.permissionRepo.find({
                where: { name: In(data.permissions) },
            });
        }

        return this.userRepo.save(user);
    }

    // Delete user
    async remove(id: string): Promise<void> {
        const user = await this.findOne(id);
        await this.userRepo.remove(user);
    }

}
