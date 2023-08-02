import { PrismaMealsRepository } from '@/repositories/prisma/prisma-meals.repository'
import { CreateMealService } from '@/services/create-meal.service'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export class CreateMealController {
  async execute(request: FastifyRequest, reply: FastifyReply) {
    const createMealSchema = z.object({
      name: z.string(),
      description: z.string(),
      created_at: z.date().default(new Date()),
      is_diet: z.boolean(),
    })

    const { name, description, created_at, is_diet } = createMealSchema.parse(
      request.body,
    )

    const userId = request.headers.user

    const mealsRepository = new PrismaMealsRepository()
    const createMealService = new CreateMealService(mealsRepository)

    await createMealService.handle(
      {
        name,
        description,
        created_at,
        is_diet,
      },
      String(userId),
    )

    return reply.status(201).send()
  }
}
