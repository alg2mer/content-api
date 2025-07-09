import { IsEnum, IsOptional, IsString, IsArray } from 'class-validator';

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

export class CreateContentDto {
  @IsString()
  title: string;

  @IsEnum(ContentType)
  type: ContentType;

  @IsString()
  description: string;

  @IsArray()
  tags: string[];

  @IsOptional()
  metadata: Record<string, any>;

  @IsOptional()
  @IsEnum(ContentStatus)
  status?: ContentStatus;
}
