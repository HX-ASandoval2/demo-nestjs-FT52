import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  HttpCode,
  HttpException,
  HttpStatus,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UserBodyDto } from 'src/dtos/users-body.dto';
import { UserAuthGuard } from 'src/guards/user-auth.guard';
import { DataAdderInterceptor } from 'src/interceptors/data-adder.interceptor';
import { UserDbService } from 'src/services/user-db.service';
import { UserService } from 'src/services/users.service';

@Controller('users')
// @UseGuards(UserAuthGuard)
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly userDBService: UserDbService,
  ) {}
  @Get()
  getUsers(@Query('name') name: string) {
    if (name) return this.userService.getByName(name);
    return this.userService.getUsers();
  }

  @Get('profile')
  getUserProfile(@Headers('token') token: string) {
    if (token !== '1234') return 'Acceso denegado';
    return 'Esta ruta devuelve el perfil del usuario';
  }

  @Get('profile/images')
  @UseGuards(UserAuthGuard)
  getProfilePics() {
    return 'Esta ruta devuelve las imágenes del perfil del usuario';
  }

  @Get(':id')
  async getUser(@Param('id', ParseUUIDPipe) id: string) {
    const user = await this.userDBService.getUser(id);
    if (!user) throw new NotFoundException('Usuario no encontrado');
    return user;
  }

  @HttpCode(418)
  @Get('coffee')
  makeCoffee() {
    return 'No puedo preparar café, soy una tetera';
  }

  @Post()
  @UseInterceptors(DataAdderInterceptor)
  createUser(@Body() user: UserBodyDto, @Req() request) {
    const modifiedUser = { ...user, createdAt: request.now };
    return this.userDBService.create(modifiedUser);
    // return this.userService.createUser(modifiedUser);
  }

  @Put()
  updateUser() {
    return 'Esta ruta actualiza un usuario';
  }

  @Delete()
  deleteUser() {
    // return 'Esta ruta elimina un usuario';
    try {
      throw Error();
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.I_AM_A_TEAPOT,
          error: 'Envío de cafecito fallido',
        },
        HttpStatus.I_AM_A_TEAPOT,
      );
    }
  }
}
