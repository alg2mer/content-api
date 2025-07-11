import { ApiProperty } from '@nestjs/swagger';

export class PaginatedResultDto<T> {
  @ApiProperty({ isArray: true, description: 'Array of items' })
  data: T[];

  @ApiProperty({ description: 'Total number of items' })
  total: number;

  @ApiProperty({ description: 'Current page number' })
  page: number;

  @ApiProperty({ description: 'Items per page limit' })
  limit: number;

  @ApiProperty({ description: 'Last page number' })
  lastPage: number;

  @ApiProperty({ description: 'Timestamp when data was fetched' })
  fetchedAt: string;
}
