import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { loggerGlobal } from './middlewares/logger';
import { UserAuthGuard } from './guards/user-auth.guard';
import { DataAdderInterceptor } from './interceptors/data-adder.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(loggerGlobal);
  app.useGlobalGuards(new UserAuthGuard());
  app.useGlobalInterceptors(new DataAdderInterceptor());
  await app.listen(3000);
}
bootstrap();
