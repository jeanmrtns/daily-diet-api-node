import { MealsRepository } from '@/repositories/meals.repository'

export class FindMealByIdService {
  constructor(private mealsRepository: MealsRepository) {}

  async handle(mealId: string, userId: string) {
    const meal = await this.mealsRepository.findById(mealId)

    if (!meal) {
      throw new Error('Meal not found')
    }

    if (meal?.user_id !== userId) {
      throw new Error('You do not have permission to see this information')
    }

    return meal
  }
}
