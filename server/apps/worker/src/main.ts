import { NestFactory } from '@nestjs/core';
import { WorkerModule } from './worker.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(WorkerModule);
  const config = app.get<ConfigService>(ConfigService);
  // Setup Swagger
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Worker API')
    .setDescription('API for Dreemhack worker')
    .setVersion('0.1')
    .build();
  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('doc', app, swaggerDocument);
  await app.listen(config.get<string>('WORKER_PORT'));
  console.log('Worker started');
  console.log(`Listening on port ${app.getHttpServer().address().port}`);
  console.log('Aviable env variables:');
  console.log('  WORKER_PORT: Set the listening port of the worker');
  console.log(`    - Actual value: ${config.get<string>('WORKER_PORT')}`);
  console.log('  MASTER_WS: Set the websocket address of the master');
  console.log(`    - Actual value: ${config.get<string>('MASTER_WS')}`);
  console.log('  WORKER_ID: Set the id of the worker');
  console.log(`    - Actual value: ${config.get<string>('WORKER_ID')}`);
}
bootstrap();
