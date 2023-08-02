import { PrismaMealsRepository } from '@/repositories/prisma/prisma-meals.repository'
import { GetUserMetricsService } from '@/services/get-user-metrics.service'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export class GetUserMetricsController {
  async execute(request: FastifyRequest, reply: FastifyReply) {
    const userMetricsSchema = z.object({
      user: z.string(),
    })

    const { user } = userMetricsSchema.parse(request.headers)

    const mealsRepository = new PrismaMealsRepository()
    const getUserMetricsService = new GetUserMetricsService(mealsRepository)

    const metrics = await getUserMetricsService.handle(user)

    return reply.status(200).send({ metrics })
  }
}
