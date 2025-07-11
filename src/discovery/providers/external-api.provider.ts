import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ContentProvider } from '../interfaces/content-provider.interface';
import { SearchContentDto } from '../dto/search-content.dto';
import { PaginatedResult } from 'src/discovery/interfaces/paginated-result.interface';
import { Content } from 'src/content/entities/content.entity';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class ExternalApiProvider implements ContentProvider {
    constructor(
        private readonly httpService: HttpService,
    ) { }

    async searchContent(input: SearchContentDto): Promise<PaginatedResult<Content>> {
        const params = {
            q: input.keyword || '',
            type: input.type,
            authorId: input.authorId,
            page: input.page || 1,
            limit: input.limit || 10,
            sortBy: input.sortBy || 'createdAt',
            order: input.order || 'desc',
        };

        const response = await firstValueFrom(
            this.httpService.get('https://external-api.com/search', { params })
        );

        const data = response.data?.results || [];
        const total = response.data?.total || data.length;

        return {
            data,
            total,
            page: params.page,
            limit: params.limit,
            lastPage: Math.ceil(total / params.limit),
            fetchedAt: new Date().toISOString(),
        };
    }
}
