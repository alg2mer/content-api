import { Controller, Get, Post, Body, Param, Delete, UseGuards, Request, Put } from '@nestjs/common';
import { ContentService } from './content.service';
import { CreateContentDto } from './dto/create-content.dto';
import { UpdateContentDto } from './dto/update-content.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Permissions } from '../common/decorators/permissions.decorator';
import { ApiOperation, ApiResponse, ApiTags, ApiBearerAuth, ApiParam, ApiBody } from '@nestjs/swagger';

@ApiTags('Content')
@ApiBearerAuth()
@Controller('content')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ContentController {
  constructor(private readonly contentService: ContentService) { }

  @ApiOperation({ summary: 'Create new content' })
  @ApiResponse({ status: 201, description: 'Content created successfully.' })
  @ApiResponse({ status: 400, description: 'Validation failed.' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @Post()
  @Permissions('CREATE_CONTENT')
  @ApiBody({ type: CreateContentDto })
  create(@Body() dto: CreateContentDto, @Request() req) {
    return this.contentService.create(dto, req.user.userId);
  }

  @ApiOperation({ summary: 'Get all content items' })
  @ApiResponse({ status: 200, description: 'List of content returned.' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @Get()
  @Permissions('CREATE_CONTENT')
  findAll() {
    return this.contentService.findAll();
  }

  @ApiOperation({ summary: 'Get content by ID' })
  @ApiResponse({ status: 200, description: 'Content item returned.' })
  @ApiResponse({ status: 404, description: 'Content not found.' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiParam({ name: 'id', description: 'Content unique identifier' })
  @Get(':id')
  @Permissions('CREATE_CONTENT')
  findOne(@Param('id') id: string) {
    return this.contentService.findOne(id);
  }

  @ApiOperation({ summary: 'Update content by ID' })
  @ApiResponse({ status: 200, description: 'Content updated successfully.' })
  @ApiResponse({ status: 400, description: 'Validation failed.' })
  @ApiResponse({ status: 404, description: 'Content not found.' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiParam({ name: 'id', description: 'Content unique identifier' })
  @ApiBody({ type: UpdateContentDto })
  @Put(':id')
  @Permissions('EDIT_CONTENT')
  update(@Param('id') id: string, @Body() dto: UpdateContentDto) {
    return this.contentService.update(id, dto);
  }

  @ApiOperation({ summary: 'Delete content by ID' })
  @ApiResponse({ status: 200, description: 'Content deleted successfully.' })
  @ApiResponse({ status: 404, description: 'Content not found.' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiParam({ name: 'id', description: 'Content unique identifier' })
  @Delete(':id')
  @Permissions('DELETE_CONTENT')
  remove(@Param('id') id: string) {
    return this.contentService.remove(id);
  }
}
