import { ConfigService } from '@nestjs/config';
import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import * as morgan from 'morgan'
import { CORS } from './constants';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';

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
  const reflector = app.get(Reflector)
  app.setGlobalPrefix('api')
  app.useGlobalInterceptors(new ClassSerializerInterceptor(reflector))
  app.enableCors(CORS)

  await app.listen(configService.get('PORT'));
  console.log(`App corriendo en puerto ${configService.get('PORT')}`)
  console.log(`URL: ${await app.getUrl()}`)
}
bootstrap();
