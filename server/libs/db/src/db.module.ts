import { Module } from '@nestjs/common';
import { DbService } from './db.service';
import { ConfigModule } from '@nestjs/config';
import { UsersService } from './users/users.service';
import * as Joi from 'joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        POSTGRES_HOST: Joi.string().default('localhost'),
        POSTGRES_PORT: Joi.number().default(5432),
        POSTGRES_USER: Joi.string().default('test'),
        POSTGRES_PASSWORD: Joi.string().default('test'),
        POSTGRES_DB: Joi.string().required(),
      }),
    }),
    // TypeOrmModule.forRootAsync({
    //   imports: [ConfigModule],
    //   inject: [ConfigService],
    //   useFactory: (env: ConfigService) => ({
    //     type: 'postgres',
    //     host: env.get<string>('POSTGRES_HOST'),
    //     port: env.get<number>('POSTGRES_PORT'),
    //     username: env.get<string>('POSTGRES_USER'),
    //     password: env.get<string>('POSTGRES_PASSWORD'),
    //     database: env.get<string>('POSTGRES_DB'),
    //     synchronize: true,
    //   }),
    // }),
    // TypeOrmModule.forFeature([]),
  ],
  providers: [DbService, UsersService],
  exports: [ConfigModule, DbService, UsersService],
})
export class DbModule {}
