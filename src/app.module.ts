import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users.module';
import { TodosModule } from './modules/todos.module';

@Module({
  imports: [UsersModule, TodosModule],
  controllers: [AppController],
  // providers: [AppService],// Declaración reducida
  providers: [
    //Declaración extendida
    {
      provide: AppService,
      useClass: AppService,
    },
  ],
})
export class AppModule {}
