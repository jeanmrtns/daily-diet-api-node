import { PrismaMealsRepository } from '@/repositories/prisma/prisma-meals.repository'
import { DeleteMealService } from '@/services/delete-meal.service'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export class DeleteMealController {
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
    const deleteMealService = new DeleteMealService(mealsRepository)

    await deleteMealService.handle(id, user)

    return reply.status(200).send()
  }
}
