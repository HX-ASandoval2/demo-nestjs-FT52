import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class DataAdderInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const now = new Date();
    const formatDate = now.toLocaleDateString('es-AR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });

    // ? Acceder a la request
    const request = context.switchToHttp().getRequest();

    // ? Agregar la metadata que definimos en la fecha
    request.now = formatDate;
    return next.handle();
  }
}
