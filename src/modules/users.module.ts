import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CloudinaryConfig } from '../config/cloudinary';
import { UserController } from '../controllers/users.controller';
import { User } from '../entities/user.entity';
import { LoggerMiddleware } from '../middlewares/logger';
import { UserRepository } from '../repositories/users.repository';
import { AuthService } from '../services/auth.service';
import { CloudinaryService } from '../services/cloudinary.service';
import { UserDbService } from '../services/user-db.service';
import { UserService } from '../services/users.service';

// const userMockService = {
//   getUsers: () => 'Este es el proveedor de servicios mock',
// };

const ACCESS = 'EstaEsMiSuperClaveSecreta';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  // providers: [UserService, UserRepository],
  // providers: [
  //   {
  //     provide: UserService,
  //     useValue: userMockService,
  //   },
  //   UserRepository,
  // ],
  providers: [
    {
      provide: 'ACCESS_TOKEN',
      useValue: ACCESS,
    },
    UserService,
    UserRepository,
    UserDbService,
    CloudinaryConfig,
    CloudinaryService,
    AuthService,
    {
      provide: 'API_USERS',
      useFactory: async () => {
        const apiUsers = await fetch(
          'https://jsonplaceholder.typicode.com/users',
        ).then((response) => response.json());

        const cleanUsers = apiUsers.map((user: any) => {
          return {
            id: user.id + 3,
            name: user.name,
            email: user.email,
          };
        });

        return cleanUsers;
      },
    },
  ],
})
export class UsersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('users');
  }
}
