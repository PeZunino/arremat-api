import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { DomainError } from './domain-error';
import { FastifyReply } from 'fastify/types/reply';

@Catch(DomainError)
export class DomainExceptionFilter implements ExceptionFilter {
  catch(exception: DomainError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<FastifyReply>();

    response.code(exception.statusCode).send({
      message: exception.message,
    });
  }
}
