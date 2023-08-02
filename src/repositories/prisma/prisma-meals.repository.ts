import { Meal } from '@prisma/client'
import { EditMealData, MealsRepository } from '../meals.repository'
import { prisma } from '@/infra/database/prisma'

interface CreateMealData {
  name: string
  description: string
  is_diet: boolean
  created_at: Date
}

export class PrismaMealsRepository implements MealsRepository {
  async findAll(userId: string) {
    const meals = await prisma.meal.findMany({
      where: {
        user_id: userId,
      },
    })

    return meals
  }

  async create(data: CreateMealData, userId: string): Promise<Meal> {
    const meal = await prisma.meal.create({
      data: {
        name: data.name,
        description: data.description,
        is_diet: data.is_diet,
        created_at: data.created_at,
        user_id: userId,
      },
    })

    return meal
  }

  async edit(mealId: string, userId: string, data: EditMealData) {
    await prisma.meal.update({
      where: {
        id: mealId,
        user_id: userId,
      },
      data,
    })
  }

  async findById(id: string) {
    const meal = await prisma.meal.findUnique({
      where: {
        id,
      },
    })

    return meal
  }

  async delete(id: string) {
    await prisma.meal.delete({
      where: {
        id,
      },
    })
  }
}
