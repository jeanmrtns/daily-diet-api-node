import { PrismaMealsRepository } from '@/repositories/prisma/prisma-meals.repository'
import { EditMealService } from '@/services/edit-meal.service'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export class EditMealController {
  async execute(request: FastifyRequest, reply: FastifyReply) {
    const editMealSchema = z.object({
      name: z.string(),
      description: z.string(),
      created_at: z.coerce.date().default(new Date()),
      is_diet: z.boolean(),
    })

    const editMealParamsSchema = z.object({
      id: z.string(),
    })

    const { name, description, created_at, is_diet } = editMealSchema.parse(
      request.body,
    )

    const { id } = editMealParamsSchema.parse(request.params)

    const userId = request.headers.user

    const mealsRepository = new PrismaMealsRepository()
    const editMealService = new EditMealService(mealsRepository)

    await editMealService.handle(
      id,
      {
        name,
        description,
        created_at,
        is_diet,
      },
      String(userId),
    )

    return reply.status(200).send()
  }
}
