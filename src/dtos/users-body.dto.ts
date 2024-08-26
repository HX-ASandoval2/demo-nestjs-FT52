import { ApiHideProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
} from 'class-validator';

export class UserBodyDto {
  @ApiHideProperty()
  id: string;

  @ApiHideProperty()
  createAt?: string;

  /**
   * Esta es la propiedad name
   * @example Usuario
   */
  @IsNotEmpty()
  @IsString()
  name: string;

  /**
   * Este es el email
   * @example usuario@mail.com
   */
  @IsNotEmpty()
  @IsEmail()
  email: string;

  /**
   * Esta es la password
   * @example aabbcc123
   */
  @IsNotEmpty()
  @IsString()
  @Length(4, 10)
  password: string;

  @IsBoolean()
  isAdmin: boolean;
}

export class UserSignDto {
  /**
   * Este es el email
   * @example usuario@mail.com
   */
  @IsNotEmpty()
  @IsEmail()
  email: string;

  /**
   * Esta es la password
   * @example aabbcc123
   */
  @IsNotEmpty()
  @IsString()
  @Length(4, 10)
  password: string;
}
