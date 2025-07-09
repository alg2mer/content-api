import {Controller, Get, UseGuards} from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import { Permission } from './permission.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Permissions } from '../common/decorators/permissions.decorator';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('permissions')
export class PermissionsController {
  constructor(private readonly permissionsService: PermissionsService) { }

  @Get()
  @Permissions('MANAGE_PERMISSIONS')
  async getAll(): Promise<Permission[]> {
    return this.permissionsService.findAll();
  }
}
