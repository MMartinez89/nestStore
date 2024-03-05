import { NestFactory, Reflector } from '@nestjs/core';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // quita del payload todo los atributos que no eten el DTO
      forbidNonWhitelisted: true, //va a responder un error que se esta enviando algo que no esta contemplado en el esquema de datos
      transformOptions: {
        enableImplicitConversion: true, //Todos los  query params los tranforma a un numero
      },
    }),
  );
  //Activamos la tecnica de serealizacion desde cualquier punto
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  const config = new DocumentBuilder()
    .setTitle('API')
    .setDescription('NEST STORE')
    .setVersion('1.0')
    .addTag('cats')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  //habilitar los cors
  app.enableCors();
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
