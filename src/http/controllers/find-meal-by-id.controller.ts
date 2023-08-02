import { PrismaMealsRepository } from '@/repositories/prisma/prisma-meals.repository'
import { FindMealByIdService } from '@/services/find-meal-by-id.service'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export class FindMealByIdController {
  async execute(request: FastifyRequest, reply: FastifyReply) {
    const findMealSchema = z.object({
      id: z.string(),
    })

    const findMealHeader = z.object({
      user: z.string(),
    })

    const { id } = findMealSchema.parse(request.params)
    const { user } = findMealHeader.parse(request.headers)

    const mealsRepository = new PrismaMealsRepository()
    const findMealByIdService = new FindMealByIdService(mealsRepository)

    const meal = await findMealByIdService.handle(id, user)

    return reply.status(200).send({ meal })
  }
}
