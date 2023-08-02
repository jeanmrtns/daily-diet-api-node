import {
  CreateMealData,
  MealsRepository,
} from '@/repositories/meals.repository'

export class CreateMealService {
  constructor(private mealsRepository: MealsRepository) {}

  async handle(data: CreateMealData, userId: string) {
    const user = await this.mealsRepository.create(data, userId)

    return user
  }
}
