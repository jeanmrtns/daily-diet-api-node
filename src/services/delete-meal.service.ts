import { MealsRepository } from '@/repositories/meals.repository'

export class DeleteMealService {
  constructor(private mealsRepository: MealsRepository) {}

  async handle(mealId: string, userId: string) {
    const meal = await this.mealsRepository.findById(mealId)

    if (!meal) {
      throw new Error('Meal not found')
    }

    if (meal.user_id !== userId) {
      throw new Error('You do not have permission to this functionality')
    }

    await this.mealsRepository.delete(mealId)
  }
}
