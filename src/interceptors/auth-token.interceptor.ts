import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { AsyncLocalStorage } from 'node:async_hooks';

@Injectable()
export class AuthTokenInterceptor implements NestInterceptor {
  static storage = new AsyncLocalStorage<{ token: string }>();

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization;

    // Armazena o token no contexto
    return AuthTokenInterceptor.storage.run({ token }, () => next.handle());
  }
}
