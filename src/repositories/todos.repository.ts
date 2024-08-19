import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Todo } from 'src/entities/todo.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TodoRepository {
  constructor(
    @InjectRepository(Todo) private todoDBRepository: Repository<Todo>,
  ) {}
  private todos = [
    {
      id: 1,
      title: 'pan',
      description: 'comprar pan',
      isCompleted: false,
    },
  ];

  getTodos() {
    return this.todos;
  }

  createTodo(todo) {
    return this.todoDBRepository.save(todo);
  }
}
