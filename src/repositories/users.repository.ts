import { Injectable } from '@nestjs/common';

@Injectable()
export class UserRepository {
  private users = [
    {
      id: 1,
      name: 'Pepito',
      email: 'pepi@mail.com',
    },
    {
      id: 2,
      name: 'Pepita',
      email: 'pepa@mail.com',
    },
    {
      id: 3,
      name: 'Mimis',
      email: 'mindy@mail.com',
    },
  ];

  getUsers() {
    return this.users;
  }

  getUser(id: string) {
    return this.users.find((user) => user.id === parseInt(id));
  }

  getByName(name: string) {
    return this.users.filter((user) => user.name === name);
  }

  createUser(user: any) {
    const id = this.users.length + 1;
    this.users.push({ id, ...user });
    return user;
  }
}
