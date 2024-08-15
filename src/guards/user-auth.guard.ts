import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

function validateRequest(request) {
  const token = request.headers['token'];
  // console.log(token, 'funcion validate');
  return token === '1234';
}

@Injectable()
export class UserAuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    // console.log(request, 'request');

    return validateRequest(request);
  }
}
