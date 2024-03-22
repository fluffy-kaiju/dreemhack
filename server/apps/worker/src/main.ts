import { NestFactory } from '@nestjs/core';
import { WorkerModule } from './worker.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(WorkerModule);
  const config = app.get<ConfigService>(ConfigService);
  // Setup Swagger
  const swaggerConfig = new DocumentBuilder()
    .setTitle('RedLive API')
    .setDescription('API for the RedLive')
    .setVersion('0.1')
    .build();
  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('doc', app, swaggerDocument);
  await app.listen(config.get<string>('WORKER_PORT'));
  console.log('Worker started');
  console.log(`Listening on port ${app.getHttpServer().address().port}`);
}
bootstrap();
