import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { loggerGlobal } from './middlewares/logger';
// import { UserAuthGuard } from './guards/user-auth.guard';
// import { DataAdderInterceptor } from './interceptors/data-adder.interceptor';
import { ValidationPipe } from '@nestjs/common';

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
  await app.listen(3000);
}
bootstrap();
