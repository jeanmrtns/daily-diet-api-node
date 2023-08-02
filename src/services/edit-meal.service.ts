import { EditMealData, MealsRepository } from '@/repositories/meals.repository'

export class EditMealService {
  constructor(private mealsRepository: MealsRepository) {}

  async handle(mealId: string, data: EditMealData, userId: string) {
    await this.mealsRepository.edit(mealId, userId, data)
  }
}
