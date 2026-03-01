declare module 'fastify' {
  interface FastifyRequest {
    user: import('src/auth/types/jwt-payload.type').JwtPayload;
  }
}
