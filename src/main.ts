import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { seed } from './seeder';
import { DataSource } from 'typeorm';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as dotenv from 'dotenv';
dotenv.config();

async function bootstrap() {
  
  const app = await NestFactory.create(AppModule);

  const dataSource = app.get(DataSource);
  await seed(dataSource);

  // Swagger config
  const config = new DocumentBuilder()
    .setTitle('CMS and Discovery API')
    .setDescription('API documentation for the CMS and Discovery system')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);

  // Setup the swagger endpoint (e.g., /api/docs)
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(Number(process.env.PORT ?? 3000));
}
bootstrap();
