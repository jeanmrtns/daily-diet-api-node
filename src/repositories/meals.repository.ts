import { Meal } from '@prisma/client'

export interface CreateMealData {
  name: string
  description: string
  is_diet: boolean
  created_at: Date
}

export interface EditMealData {
  name: string
  description: string
  is_diet: boolean
  created_at: Date
}

export interface MealsRepository {
  findAll(userId: string): Promise<Meal[]>
  create(data: CreateMealData, userId: string): Promise<Meal>
  edit(mealId: string, userId: string, data: EditMealData): Promise<void>
  findById(id: string): Promise<Meal | null>
  delete(id: string): Promise<void>
}
