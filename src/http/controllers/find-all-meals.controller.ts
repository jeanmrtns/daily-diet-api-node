import { PrismaMealsRepository } from '@/repositories/prisma/prisma-meals.repository'
import { FindAllMealsService } from '@/services/find-all-meals.service'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export class FindAllMealsController {
  async execute(request: FastifyRequest, reply: FastifyReply) {
    const findMealSchema = z.object({
      user: z.string(),
    })

    const { user } = findMealSchema.parse(request.headers)

    const mealsRepository = new PrismaMealsRepository()
    const findAllMealsService = new FindAllMealsService(mealsRepository)

    const meals = await findAllMealsService.handle(user)

    return reply.status(200).send({ meals })
  }
}
