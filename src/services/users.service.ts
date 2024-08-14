import { Inject, Injectable } from '@nestjs/common';
import { UserRepository } from 'src/repositories/users.repository';

@Injectable()
export class UserService {
  constructor(
    @Inject('ACCESS_TOKEN') private access_token: string,
    @Inject('API_USERS') private api_users: any[],
    private readonly userRepository: UserRepository,
  ) {}
  getUsers(): any {
    const dbUsers = this.userRepository.getUsers();
    const allUsers = [...dbUsers, ...this.api_users];
    return this.access_token === 'EstaEsMiSuperClaveSecreta'
      ? allUsers
      : 'No tienes acceso a esta información';
  }
}
