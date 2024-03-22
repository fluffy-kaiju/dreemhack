import { Injectable } from '@nestjs/common';
import { DbService } from '../db.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class WorkerDbService {
  constructor(private dbService: DbService) {}

  async create(data: Prisma.WorkerCreateInput) {
    return this.dbService.worker.create({ data });
  }

  async findAll() {
    return this.dbService.worker.findMany();
  }

  async findOne(id: string) {
    return this.dbService.worker.findUnique({ where: { id } });
  }

  async update(id: string, data: Prisma.WorkerUpdateInput) {
    return this.dbService.worker.update({
      where: { id },
      data,
    });
  }
}
