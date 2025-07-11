import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ContentProvider } from '../interfaces/content-provider.interface';
import { Content } from 'src/content/entities/content.entity';
import { SearchContentDto } from '../dto/search-content.dto';
import { PaginatedResult } from 'src/discovery/interfaces/paginated-result.interface';

@Injectable()
export class LocalContentProvider implements ContentProvider {
    constructor(
        @InjectRepository(Content)
        private contentRepo: Repository<Content>,
    ) { }

    async searchContent(input: SearchContentDto): Promise<PaginatedResult<Content>> {

        const {
            keyword,
            type,
            authorId,
            page = 1,
            limit = 10,
            sortBy = 'createdAt',
            order = 'desc',
        } = input;

        const query = this.contentRepo.createQueryBuilder('content')
            .leftJoinAndSelect('content.createdBy', 'user');

        if (keyword) {
            query.andWhere(
                '(content.title ILIKE :keyword OR content.description ILIKE :keyword)',
                { keyword: `%${keyword}%` },
            );
        }

        if (type) {
            query.andWhere('content.type = :type', { type });
        }

        if (authorId) {
            query.andWhere('user.id = :authorId', { authorId });
        }

        query.orderBy(`content.${sortBy}`, order.toUpperCase() as 'ASC' | 'DESC');
        query.skip((page - 1) * limit).take(limit);

        const [data, total] = await query.getManyAndCount();

        const result = {
            data,
            total,
            page,
            limit,
            lastPage: Math.ceil(total / limit),
            fetchedAt: new Date().toISOString(),
        };

        return result;

    }

}
