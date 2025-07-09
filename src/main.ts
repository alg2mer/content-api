import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { seed } from './seeder';
import { DataSource } from 'typeorm';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const dataSource = app.get(DataSource); // ✅ Get it using the correct class
  await seed(dataSource); // ✅ Use it

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
