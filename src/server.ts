import Fastify from 'fastify'

import cors from '@fastify/cors'
import jwt from '@fastify/jwt'

import { poolRoutes } from './routes/pool'
import { userRoutes } from './routes/user'
import { guessRoutes } from './routes/guess'
import { authRoutes } from './routes/auth'
import { gameRoutes } from './routes/game'

const start = async () => {
    const fastify = Fastify({
        logger: true,
    })

    try{
        await fastify.register(cors, {
            origin: true
        })

        await fastify.register(jwt, {
            secret: String(process.env.JWT_SECRET)
        })

        await fastify.register(authRoutes)
        await fastify.register(gameRoutes)
        await fastify.register(guessRoutes)
        await fastify.register(poolRoutes)
        await fastify.register(userRoutes)

        await fastify.listen({ port: 3333, host: '0.0.0.0' })
    } catch (err) {
        fastify.log.error(err)

        process.exit(1)
    }
}

start()
