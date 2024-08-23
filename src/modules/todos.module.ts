import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoController } from '../controllers/todos.controller';
import { File } from '../entities/file.entity';
import { Todo } from '../entities/todo.entity';
import { TodoRepository } from '../repositories/todos.repository';
import { TodoService } from '../services/todos.service';

@Module({
  imports: [TypeOrmModule.forFeature([Todo, File])],
  controllers: [TodoController],
  providers: [TodoService, TodoRepository],
})
export class TodosModule {}
