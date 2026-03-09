import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import fastifyCookie from '@fastify/cookie';
import { AppModule } from './app.module';
import helmet from '@fastify/helmet';
import fastifyCsrf from '@fastify/csrf-protection';
import { ValidationPipe } from '@nestjs/common';
import { DomainExceptionFilter } from './common/exception.filter';
import { ResultInterceptor } from './common/result.interceptor';
async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  await app.register(helmet);
  await app.register(fastifyCsrf);
  await app.register(fastifyCookie, {
    secret: process.env.COOKIE_SECRET,
  });

  app.enableCors();
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  app.useGlobalFilters(new DomainExceptionFilter());
  app.useGlobalInterceptors(new ResultInterceptor());
  await app.listen(process.env.PORT ?? 3000, '0.0.0.0');
}
bootstrap();
