import { UsersRepository } from '@/repositories/users.repository'
import { Prisma } from '@prisma/client'

export class CreateUserService {
  constructor(private usersRepository: UsersRepository) {}

  async handle(data: Prisma.UserCreateInput) {
    const user = await this.usersRepository.create(data)

    return user
  }
}
