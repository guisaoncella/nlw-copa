import Fastify from 'fastify'
import cors from '@fastify/cors'
import { poolRoutes } from './routes/pool'
import { userRoutes } from './routes/user'
import { guessRoutes } from './routes/guess'
import { authRoutes } from './routes/auth'
import { gameRoutes } from './routes/game'
import jwt from '@fastify/jwt'

async function bootstrap(){
  const fastify = Fastify({
    logger: true,
  })

  await fastify.register(cors, {
    origin: true,
  })

  await fastify.register(jwt, {
    secret: process.env.SECRET_JWT as string,
  })

  await fastify.register(poolRoutes)
  await fastify.register(userRoutes)
  await fastify.register(guessRoutes)
  await fastify.register(authRoutes)
  await fastify.register(gameRoutes)

  await fastify.listen({port: 3333, host: '0.0.0.0'})
}

bootstrap()