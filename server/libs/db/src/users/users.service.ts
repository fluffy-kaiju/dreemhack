import { Injectable } from '@nestjs/common';
import { DbService } from '../db.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private dbService: DbService) {}

  async getUser(id: string) {
    return this.dbService.user.findUnique({
      where: { id },
    });
  }

  async createUser(data: Prisma.UserCreateInput) {
    return this.dbService.user.create({ data });
  }
}
