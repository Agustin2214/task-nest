import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as morgan from 'morgan'
import { CORS } from './constants';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService)

  app.use(morgan('dev'))

  app.useGlobalPipes(
    new ValidationPipe({
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  app.setGlobalPrefix('api')

  app.enableCors(CORS)

  await app.listen(configService.get('PORT'));
  console.log(`App corriendo en puerto ${configService.get('PORT')}`)
  console.log(`URL: ${await app.getUrl()}`)
}
bootstrap();
