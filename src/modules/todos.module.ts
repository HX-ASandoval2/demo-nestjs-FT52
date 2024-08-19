import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoController } from 'src/controllers/todos.controller';
import { Todo } from 'src/entities/todo.entity';
import { TodoRepository } from 'src/repositories/todos.repository';
import { TodoService } from 'src/services/todos.service';

@Module({
  imports: [TypeOrmModule.forFeature([Todo])],
  controllers: [TodoController],
  providers: [TodoService, TodoRepository],
})
export class TodosModule {}
