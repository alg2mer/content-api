import { Controller, Get, Query } from '@nestjs/common';
import { DiscoveryService } from './discovery.service';
import { SearchContentDto } from './dto/search-content.dto';

import {
  ApiTags,
  ApiExtraModels,
  ApiOkResponse,
  getSchemaPath,
} from '@nestjs/swagger';
import { PaginatedResultDto } from './dto/paginated-result.dto';

@ApiTags('Discovery')
@Controller('discovery')
export class DiscoveryController {
  constructor(private readonly discoveryService: DiscoveryService) { }

  @ApiExtraModels(SearchContentDto, PaginatedResultDto)
  @ApiOkResponse({
    description: 'Paginated search results',
    schema: {
      allOf: [
        { $ref: getSchemaPath(PaginatedResultDto) },
        {
          properties: {
            data: {
              type: 'array',
              items: { $ref: getSchemaPath(SearchContentDto) },
            },
          },
        },
      ],
    },
  })
  @Get('search')
  search(@Query() dto: SearchContentDto) {
    return this.discoveryService.search(dto);
  }
}
