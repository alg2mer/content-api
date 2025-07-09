import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../../users/user.entity';

export enum ContentType {
  DOCUMENTARY = 'DOCUMENTARY',
  PODCAST = 'PODCAST',
  VIDEO = 'VIDEO',
  ARTICLE = 'ARTICLE',
}

export enum ContentStatus {
  DRAFT = 'DRAFT',
  PUBLISHED = 'PUBLISHED',
  ARCHIVED = 'ARCHIVED',
}

@Entity()
export class Content {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({
    type: 'enum',
    enum: ContentType,
  })
  type: ContentType;

  @Column({ type: 'text' })
  description: string;

  @Column("simple-array")
  tags: string[];

  @Column({ type: 'json', nullable: true })
  metadata: Record<string, any>;

  @Column({
    type: 'enum',
    enum: ContentStatus,
    default: ContentStatus.DRAFT,
  })
  status: ContentStatus;

  @ManyToOne(() => User, (user) => user.createdContent, { eager: true })
  createdBy: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
