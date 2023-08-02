import { Prisma } from '@prisma/client'
import { UsersRepository } from '../users.repository'
import { prisma } from '@/infra/database/prisma'

export class PrismaUsersRepository implements UsersRepository {
  async create(data: Prisma.UserCreateInput) {
    const user = await prisma.user.create({
      data,
    })

    return user
  }
}
