import { Module } from '@nestjs/common';
import { DiscoveryService } from './discovery.service';
import { DiscoveryController } from './discovery.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Content } from 'src/content/entities/content.entity';
import { LocalContentProvider } from './providers/local-content.provider';
import { ExternalApiProvider } from './providers/external-api.provider';
import * as redisStore from 'cache-manager-ioredis-yet';
import { CacheModule } from '@nestjs/cache-manager';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    TypeOrmModule.forFeature([Content]),
    CacheModule.registerAsync({
      useFactory: async () => ({
        store: redisStore,
        host: process.env.REDIS_HOST,
        port: Number(process.env.REDIS_PORT),
        ttl: Number(process.env.REDIS_TTL),
      }),
    }),
    HttpModule,
  ],
  providers: [
    DiscoveryService,
    LocalContentProvider,
    ExternalApiProvider,
  ],
  controllers: [DiscoveryController]
})
export class DiscoveryModule { }
