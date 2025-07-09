import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/user.entity';
import { Permission } from './permissions/permission.entity';
import { UsersModule } from './users/users.module';
import { PermissionsModule } from './permissions/permissions.module';
import { AuthModule } from './auth/auth.module';
import { ContentModule } from './content/content.module';
import { Content } from './content/entities/content.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres', // or 'mysql'
      host: 'localhost',
      port: 5432,
      username: 'admin',
      password: '123456',
      database: 'content_api',
      entities: [User, Permission, Content],
      synchronize: true, // Use only in development
    }),
    TypeOrmModule.forFeature([User, Permission]),
    UsersModule,
    PermissionsModule,
    AuthModule,
    ContentModule
  ],
})
export class AppModule {}
