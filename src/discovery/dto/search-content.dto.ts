import { IsOptional, IsString, IsInt, Min, IsIn } from 'class-validator';
import { Type } from 'class-transformer';

export class SearchContentDto {
  @IsOptional()
  @IsString()
  keyword?: string;

  @IsOptional()
  @IsString()
  type?: string;

  @IsOptional()
  @IsString()
  authorId?: string;

  // Pagination
  @Type(() => Number)
  @IsOptional()
  @IsInt()
  @Min(1)
  page?: number = 1;

  @Type(() => Number)
  @IsOptional()
  @IsInt()
  @Min(1)
  limit?: number = 10;

  // Sorting
  @IsOptional()
  @IsString()
  @IsIn(['createdAt', 'title', 'type'], { message: 'Invalid sort field' })
  sortBy?: string = 'createdAt';

  @IsOptional()
  @IsIn(['asc', 'desc'], { message: 'Sort order must be asc or desc' })
  order?: 'asc' | 'desc' = 'desc';
}