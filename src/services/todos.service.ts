import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { File } from 'src/entities/file.entity';
import { TodoRepository } from 'src/repositories/todos.repository';
import { Repository } from 'typeorm';

@Injectable()
export class TodoService {
  constructor(
    private readonly todoRepository: TodoRepository,
    @InjectRepository(File) private readonly fileRepository: Repository<File>,
  ) {}
  getTodos(): any {
    return this.todoRepository.getTodos();
  }

  createTodo(todo) {
    return this.todoRepository.createTodo(todo);
  }

  saveFile(name: string, mimeType: string, data: Buffer): Promise<File> {
    const file = new File();
    file.name = name;
    file.mimeType = mimeType;
    file.data = data;

    return this.fileRepository.save(file);
  }
}
