import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class UserAuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    const token = request.headers.authorization?.split(' ')[1];

    if (!token) throw new UnauthorizedException('Bearer token not found');

    try {
      const secret = process.env.JWT_SECRET;
      const payload = this.jwtService.verify(token, { secret });
      // console.log(payload);

      payload.exp = new Date(payload.exp * 1000);
      payload.iat = new Date(payload.iat * 1000);

      // ? Dar permisos de administrador:
      payload.roles = ['admin'];

      request.user = payload;

      return true;
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
