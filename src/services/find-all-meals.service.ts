import { MealsRepository } from '@/repositories/meals.repository'

export class FindAllMealsService {
  constructor(private mealsRepository: MealsRepository) {}

  async handle(userId: string) {
    const meals = await this.mealsRepository.findAll(userId)

    return meals
  }
}
