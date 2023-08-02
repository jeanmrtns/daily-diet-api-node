import { FastifyInstance } from 'fastify'
import { CreateUserController } from './controllers/create-user.controller'
import { CreateMealController } from './controllers/create-meal.controller'
import { FindMealByIdController } from './controllers/find-meal-by-id.controller'
import { DeleteMealController } from './controllers/delete-meal.controller'
import { FindAllMealsController } from './controllers/find-all-meals.controller'
import { GetUserMetricsController } from './controllers/get-user-metrics.controller'
import { EditMealController } from './controllers/edit-meal.controller'

export async function appRoutes(app: FastifyInstance) {
  app.post('/users', new CreateUserController().execute)
  app.get('/users/metrics', new GetUserMetricsController().execute)

  app.get('/meals', new FindAllMealsController().execute)
  app.get('/meals/:id', new FindMealByIdController().execute)
  app.post('/meals', new CreateMealController().execute)
  app.put('/meals/:id', new EditMealController().execute)
  app.delete('/meals/:id', new DeleteMealController().execute)
}
