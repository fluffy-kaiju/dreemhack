import { Injectable } from '@nestjs/common';
import { DbService } from '../db.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class UsersDbService {
  constructor(private dbService: DbService) {}

  async getUser(id: string) {
    return this.dbService.user.findUnique({
      where: { id },
    });
  }

  async getUsers() {
    return this.dbService.user.findMany();
  }

  async createUser(data: Prisma.UserCreateInput) {
    return this.dbService.user.create({ data });
  }

  async updateUser(id: string, data: Prisma.UserUpdateInput) {
    return this.dbService.user.update({
      where: { id },
      data,
    });
  }

  async deleteUser(id: string) {
    return this.dbService.user.delete({
      where: { id },
    });
  }

  async getUserJobs(userId: string) {
    return this.dbService.user.findUnique({
      where: { id: userId },
      include: { jobs: true },
    });
  }
}
