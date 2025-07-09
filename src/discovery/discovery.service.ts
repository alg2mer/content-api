import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Content } from '../content/entities/content.entity';
import { Repository } from 'typeorm';
import { SearchContentDto } from './dto/search-content.dto';

@Injectable()
export class DiscoveryService {
  constructor(
    @InjectRepository(Content)
    private contentRepo: Repository<Content>,
  ) {}

  async search(dto: SearchContentDto) {
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

    return {
      data,
      total,
      page,
      limit,
      lastPage: Math.ceil(total / limit),
    };
  }
}
