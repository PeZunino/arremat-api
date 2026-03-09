import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';
import { Result } from './result';

@Injectable()
export class ResultInterceptor implements NestInterceptor {
  intercept(
    _context: ExecutionContext,
    next: CallHandler,
  ): Observable<unknown> {
    return next.handle().pipe(
      map((data: unknown) => {
        if (data && typeof data === 'object' && 'ok' in data) {
          const result = data as Result<unknown, unknown>;
          if (!result.ok) {
            throw result.error;
          }

          return result.value;
        }

        return data;
      }),
    );
  }
}
