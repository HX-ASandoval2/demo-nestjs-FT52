import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserDbService {
  constructor(
    @InjectRepository(User) private userDBRepository: Repository<User>,
  ) {}

  async create(user: User) {
    return await this.userDBRepository.save(user);
  }

  async getUsers() {
    return await this.userDBRepository.find();
  }

  async getUserByName(name: string) {
    return await this.userDBRepository.findOneBy({ name });
  }

  async getUser(id: string) {
    return await this.userDBRepository.findOneBy({ id });
  }

  async findByEmail(email: string): Promise<User> {
    return await this.userDBRepository.findOneBy({ email });
  }
}
