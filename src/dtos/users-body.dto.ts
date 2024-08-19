import { IsBoolean, IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class UserBodyDto {
  id: string;
  createAt?: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsBoolean()
  isAdmin: boolean;
}
