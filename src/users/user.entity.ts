import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  OneToMany,
} from 'typeorm';
import { Permission } from '../permissions/permission.entity';
import { Content } from 'src/content/entities/content.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @ManyToMany(() => Permission, { eager: true })
  @JoinTable()
  permissions: Permission[];

  @OneToMany(() => Content, (content) => content.createdBy)
  createdContent: Content[];

}
