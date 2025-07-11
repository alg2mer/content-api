import { Module } from '@nestjs/common';
import { DiscoveryService } from './discovery.service';
import { DiscoveryController } from './discovery.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Content } from 'src/content/entities/content.entity';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [
    TypeOrmModule.forFeature([Content]),
    CacheModule.register(),
  ],
  providers: [DiscoveryService],
  controllers: [DiscoveryController]
})
export class DiscoveryModule { }
