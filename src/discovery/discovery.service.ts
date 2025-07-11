import { Inject, Injectable } from '@nestjs/common';
import { SearchContentDto } from './dto/search-content.dto';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { LocalContentProvider } from './providers/local-content.provider';
import { ExternalApiProvider } from './providers/external-api.provider';

@Injectable()
export class DiscoveryService {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private readonly localProvider: LocalContentProvider,
    private readonly externalProvider: ExternalApiProvider,
  ) { }

  async search(dto: SearchContentDto) {
    const source = "local"; // for now static; later can be dynamic (e.g., config, user preference)

    const cacheKey = `search:${source}:${JSON.stringify(dto)}`;
    const cached = await this.cacheManager.get(cacheKey);
    if (cached) {
      return cached;
    }

    let result = {};
    if (source === 'local') {
      result = this.localProvider.searchContent(dto);
    } else if (source === 'external') {
      result = this.externalProvider.searchContent(dto);
    } else if (source === 'both') {
      const [localResults, externalResults] = await Promise.all([
        this.localProvider.searchContent(dto),
        this.externalProvider.searchContent(dto),
      ]);

      result = {
        data: [...localResults.data, ...externalResults.data],
        total: localResults.total + externalResults.total,
        page: dto.page || 1,
        limit: dto.limit || 10,
        lastPage: Math.ceil((localResults.total + externalResults.total) / (dto.limit || 10)),
        fetchedAt: new Date().toISOString(),
      };
    } else {
      result = this.localProvider.searchContent(dto);
    }

    await this.cacheManager.set(cacheKey, result, 60);

    return result;
  }

}