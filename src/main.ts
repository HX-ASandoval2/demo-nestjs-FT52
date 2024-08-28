import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { loggerGlobal } from './middlewares/logger';
// import { UserAuthGuard } from './guards/user-auth.guard';
// import { DataAdderInterceptor } from './interceptors/data-adder.interceptor';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const PORT = process.env.PORT || 3000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(loggerGlobal);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  // app.useGlobalGuards(new UserAuthGuard());
  // app.useGlobalInterceptors(new DataAdderInterceptor());
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Demo Nest FSFT52')
    .setDescription(
      'Esta es una API construida en NestJs que va a ser empleada como demos para el módulo 4 de la especialidad backend de la carrera fullstack developer de Henry',
    )
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);

  SwaggerModule.setup('api', app, document);

  await app.listen(PORT);
}
bootstrap();
