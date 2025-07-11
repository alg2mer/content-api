import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Content } from '../content/entities/content.entity';
import { Repository } from 'typeorm';
import { SearchContentDto } from './dto/search-content.dto';
import { Cache } from 'cache-manager';
import * as crypto from 'crypto';
import { CACHE_MANAGER } from '@nestjs/cache-manager';

@Injectable()
export class DiscoveryService {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    @InjectRepository(Content)
    private contentRepo: Repository<Content>,
  ) {}

  async search(dto: SearchContentDto) {
    const cacheKey = this.generateCacheKey(dto);
    const cached = await this.cacheManager.get(cacheKey);
    if (cached) {
      return cached;
    }

    if (cached) {
      return cached;
    }

    const {
      keyword,
      type,
      authorId,
      page = 1,
      limit = 10,
      sortBy = 'createdAt',
      order = 'desc',
    } = dto;

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

    await this.cacheManager.set(cacheKey, result, 60);

    return result;
  }

  private generateCacheKey(dto: SearchContentDto): string {
    const hash = crypto
      .createHash('sha1')
      .update(JSON.stringify(dto))
      .digest('hex');

    return `search:${hash}`;
  }
}