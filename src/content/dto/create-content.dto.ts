import { IsEnum, IsOptional, IsString, IsArray } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

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
  @ApiProperty({
    description: 'Title of the content',
    example: 'The Wonders of Space',
  })
  @IsString()
  title: string;

  @ApiProperty({
    description: 'Type of the content',
    enum: ContentType,
    example: ContentType.DOCUMENTARY,
  })
  @IsEnum(ContentType)
  type: ContentType;

  @ApiProperty({
    description: 'Detailed description of the content',
    example: 'An in-depth look at the vast universe beyond our planet.',
  })
  @IsString()
  description: string;

  @ApiProperty({
    description: 'Tags related to the content for categorization',
    type: [String],
    example: ['space', 'science', 'documentary'],
  })
  @IsArray()
  tags: string[];

  @ApiPropertyOptional({
    description: 'Additional metadata as key-value pairs',
    example: { duration: 120, language: 'en', publishedDate: '2025-07-11' },
  })
  @IsOptional()
  metadata?: Record<string, any>;

  @ApiPropertyOptional({
    description: 'Current status of the content',
    enum: ContentStatus,
    example: ContentStatus.DRAFT,
  })
  @IsOptional()
  @IsEnum(ContentStatus)
  status?: ContentStatus;
}
