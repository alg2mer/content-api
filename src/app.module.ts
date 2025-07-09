import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/user.entity';
import { Permission } from './permissions/permission.entity';
import { UsersModule } from './users/users.module';
import { PermissionsModule } from './permissions/permissions.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres', // or 'mysql'
      host: 'localhost',
      port: 5432,
      username: 'admin',
      password: '123456',
      database: 'content_api',
      entities: [User, Permission],
      synchronize: true, // Use only in development
    }),
    TypeOrmModule.forFeature([User, Permission]),
    UsersModule,
    PermissionsModule,
  ],
})
export class AppModule {}
