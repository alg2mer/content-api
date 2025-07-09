import { Module } from '@nestjs/common';
import { DiscoveryService } from './discovery.service';
import { DiscoveryController } from './discovery.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Content } from 'src/content/entities/content.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Content]),
  ],
  providers: [DiscoveryService],
  controllers: [DiscoveryController]
})
export class DiscoveryModule { }
