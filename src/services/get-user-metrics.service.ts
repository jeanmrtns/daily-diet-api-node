import { MealsRepository } from '@/repositories/meals.repository'

export class GetUserMetricsService {
  constructor(private mealsRepository: MealsRepository) {}

  async handle(userId: string) {
    const meals = await this.mealsRepository.findAll(userId)

    const mealsInDiet = meals.filter((meal) => meal.is_diet)
    const mealsOutDiet = meals.filter((meal) => !meal.is_diet)
    let currentSequence = 0
    let dietSequences = 0

    const mealsSorted = meals.sort(
      (a, b) => b.created_at.getTime() + a.created_at.getTime(),
    )

    for (let i = 1; i < mealsSorted.length; i++) {
      if (mealsSorted[i].is_diet && mealsSorted[i - 1].is_diet) {
        currentSequence++
        dietSequences++
      } else {
        dietSequences =
          currentSequence > dietSequences ? currentSequence : dietSequences
      }
    }

    const metrics = {
      user_id: userId,
      total: meals.length,
      in_diet: mealsInDiet.length,
      out_diet: mealsOutDiet.length,
      best_sequence: dietSequences,
    }

    return metrics
  }
}
