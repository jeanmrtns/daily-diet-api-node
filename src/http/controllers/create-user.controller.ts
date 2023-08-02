import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users.repository'
import { CreateUserService } from '@/services/create-user.service'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export class CreateUserController {
  async execute(request: FastifyRequest, reply: FastifyReply) {
    const createUserSchema = z.object({
      name: z.string(),
      email: z.string().email(),
      password: z.string().min(6),
    })

    const { name, email, password } = createUserSchema.parse(request.body)

    const usersRepository = new PrismaUsersRepository()
    const createUserService = new CreateUserService(usersRepository)

    const user = await createUserService.handle({
      name,
      email,
      password,
    })

    reply.header('userId', user.id)

    return reply.status(201).send()
  }
}
