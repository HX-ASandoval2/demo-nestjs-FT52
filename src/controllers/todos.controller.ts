import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { TodoService } from 'src/services/todos.service';

@Controller('todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  getTodos(): string {
    return this.todoService.getTodos();
  }

  @Get(':id')
  @UsePipes(new ValidationPipe({ transform: true }))
  getTodoById(@Param('id') id: number) {
    console.log(typeof id);

    return `Este es el todo con el id ${id}`;
  }

  @Post()
  createTodo(@Body() todo) {
    return this.todoService.createTodo(todo);
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
