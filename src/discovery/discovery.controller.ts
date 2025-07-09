import { Controller, Get, Query } from '@nestjs/common';
import { DiscoveryService } from './discovery.service';
import { SearchContentDto } from './dto/search-content.dto';

@Controller('discovery')
export class DiscoveryController {
  constructor(private readonly discoveryService: DiscoveryService) {}

  @Get('search')
  search(@Query() dto: SearchContentDto) {
    return this.discoveryService.search(dto);
  }
}
