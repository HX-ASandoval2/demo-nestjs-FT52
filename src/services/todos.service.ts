import { Injectable } from '@nestjs/common';
import { TodoRepository } from 'src/repositories/todos.repository';

@Injectable()
export class TodoService {
  constructor(private readonly todoRepository: TodoRepository) {}
  getTodos(): any {
    return this.todoRepository.getTodos();
  }

  createTodo(todo) {
    return this.todoRepository.createTodo(todo);
  }
}
