import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  HttpCode,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UserAuthGuard } from 'src/guards/user-auth.guard';
import { DataAdderInterceptor } from 'src/interceptors/data-adder.interceptor';
import { UserService } from 'src/services/users.service';

@Controller('users')
@UseGuards(UserAuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}
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
  getUser(@Param('id') id: string) {
    return this.userService.getUser(id);
  }

  @HttpCode(418)
  @Get('coffee')
  makeCoffee() {
    return 'No puedo preparar café, soy una tetera';
  }

  @Post()
  @UseInterceptors(DataAdderInterceptor)
  createUser(@Body() user: any, @Req() request) {
    const modifiedUser = { ...user, createdAt: request.now };
    return this.userService.createUser(modifiedUser);
  }

  @Put()
  updateUser() {
    return 'Esta ruta actualiza un usuario';
  }

  @Delete()
  deleteUser() {
    return 'Esta ruta elimina un usuario';
  }
}
