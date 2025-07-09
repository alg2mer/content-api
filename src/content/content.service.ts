import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Content } from './entities/content.entity';
import { Repository } from 'typeorm';
import { CreateContentDto } from './dto/create-content.dto';
import { UpdateContentDto } from './dto/update-content.dto';

@Injectable()
export class ContentService {
  constructor(
    @InjectRepository(Content)
    private readonly contentRepo: Repository<Content>,
  ) {}

  create(dto: CreateContentDto, userId: string) {
    const content = this.contentRepo.create({ ...dto, createdBy: { id: userId } });
    return this.contentRepo.save(content);
  }

  findAll() {
    return this.contentRepo.find({ relations: ['createdBy'] });
  }

  async findOne(id: string) {
    const content = await this.contentRepo.findOne({ where: { id }, relations: ['createdBy'] });
    if (!content) throw new NotFoundException('Content not found');
    return content;
  }

  async update(id: string, dto: UpdateContentDto) {
    await this.findOne(id); // Throws if not found
    await this.contentRepo.update(id, dto);
    return this.findOne(id);
  }

  async remove(id: string) {
    const content = await this.findOne(id);
    return this.contentRepo.remove(content);
  }
}
