import {
  Controller, Get, Post, Body, Param, Delete, UseGuards, Request,
  Put
} from '@nestjs/common';
import { ContentService } from './content.service';
import { CreateContentDto } from './dto/create-content.dto';
import { UpdateContentDto } from './dto/update-content.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Permissions } from '../common/decorators/permissions.decorator';

@Controller('content')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ContentController {
  constructor(private readonly contentService: ContentService) {}

  @Post()
  @Permissions('CREATE_CONTENT')
  create(@Body() dto: CreateContentDto, @Request() req) {
    return this.contentService.create(dto, req.user.userId);
  }

  @Get()
  @Permissions('CREATE_CONTENT')
  findAll() {
    return this.contentService.findAll();
  }

  @Get(':id')
  @Permissions('CREATE_CONTENT')
  findOne(@Param('id') id: string) {
    return this.contentService.findOne(id);
  }

  @Put(':id')
  @Permissions('EDIT_CONTENT')
  update(@Param('id') id: string, @Body() dto: UpdateContentDto) {
    return this.contentService.update(id, dto);
  }

  @Delete(':id')
  @Permissions('DELETE_CONTENT')
  remove(@Param('id') id: string) {
    return this.contentService.remove(id);
  }
}
