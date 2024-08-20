import {
  Body,
  Controller,
  Delete,
  FileTypeValidator,
  Get,
  Headers,
  HttpCode,
  HttpException,
  HttpStatus,
  MaxFileSizeValidator,
  NotFoundException,
  Param,
  ParseFilePipe,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UserBodyDto } from 'src/dtos/users-body.dto';
import { UserAuthGuard } from 'src/guards/user-auth.guard';
import { DataAdderInterceptor } from 'src/interceptors/data-adder.interceptor';
import { CloudinaryService } from 'src/services/cloudinary.service';
import { UserDbService } from 'src/services/user-db.service';
import { UserService } from 'src/services/users.service';

@Controller('users')
// @UseGuards(UserAuthGuard)
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly userDBService: UserDbService,
    private readonly cloudinaryService: CloudinaryService,
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

  @Post('profile/images')
  @UseInterceptors(FileInterceptor('image'))
  async uploadProfilePic(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({
            maxSize: 100000,
            message: 'El archivo debe ser menor a 100kb',
          }),
          new FileTypeValidator({
            fileType: /(jpg|jpeg|png|webp|gif|svg)/,
          }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    return await this.cloudinaryService.uploadImage(file);
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
