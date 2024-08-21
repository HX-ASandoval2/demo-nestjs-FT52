import { BadRequestException, Injectable } from '@nestjs/common';
import { UserDbService } from './user-db.service';
import { User } from 'src/entities/user.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userDBService: UserDbService,
    private readonly jwtService: JwtService,
  ) {}

  //? Proceso de registro del usuario:
  async signUp(user: User) {
    const foundUser = await this.userDBService.findByEmail(user.email);

    if (foundUser) throw new BadRequestException('Email already exists');

    const hashedPassword = await bcrypt.hash(user.password, 10);

    if (!hashedPassword)
      throw new BadRequestException('Password could not be hashed');

    this.userDBService.create({ ...user, password: hashedPassword });
    return 'User created successfully';
  }

  //? Proceso de inicio de sesión del usuario:
  async signIn(email: string, password: string) {
    const user = await this.userDBService.findByEmail(email);

    if (!user) throw new BadRequestException('User not found');

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) throw new BadRequestException('Invalid Credentials');

    const userPayload = {
      id: user.id,
      email: user.email,
    };

    const token = this.jwtService.sign(userPayload);

    return {
      message: 'User logged successfully',
      token,
    };
  }
}
