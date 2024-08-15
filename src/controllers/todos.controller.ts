import { Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { TodoService } from 'src/services/todos.service';

@Controller('todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  getTodos(): string {
    return this.todoService.getTodos();
  }

  @Post()
  createTodo() {
    return 'Esta ruta crea un todo';
  }

  @Put()
  updateTodo() {
    return 'Esta ruta actualiza un todo';
  }

  @Delete()
  deleteTodo() {
    return 'Esta ruta elimina un todo';
  }
}
