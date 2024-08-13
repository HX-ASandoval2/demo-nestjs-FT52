import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log(
      `Estás ejecutando el método ${req.method} en la ruta ${req.baseUrl}`,
    );

    next();
  }
}

export function loggerGlobal(req: Request, res: Response, next: NextFunction) {
  console.log(
    `Estás ejecutando el método ${req.method} en la ruta ${req.originalUrl} de manera global`,
  );
  next();
}
