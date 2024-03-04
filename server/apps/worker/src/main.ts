import { NestFactory } from '@nestjs/core';
import { WorkerModule } from './worker.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(WorkerModule);

  // Setup Swagger
  const swaggerConfig = new DocumentBuilder()
    .setTitle('RedLive API')
    .setDescription('API for the RedLive')
    .setVersion('0.1')
    .build();
  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('doc', app, swaggerDocument);
  await app.listen(3000);
}
bootstrap();
