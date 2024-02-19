import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // quita del payload todo los atributos que no eten el DTO
      forbidNonWhitelisted: true, //va a responder un error que se esta enviando algo que no esta contemplado en el esquema de datos
    }),
  );
  await app.listen(3000);
}
bootstrap();
