import { Controller, Get } from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import { Permission } from './permission.entity';

@Controller('permissions')
export class PermissionsController {
  constructor(private readonly permissionsService: PermissionsService) {}

  @Get()
  async getAll(): Promise<Permission[]> {
    return this.permissionsService.findAll();
  }
}
