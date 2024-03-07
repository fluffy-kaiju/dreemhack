import { Injectable } from '@nestjs/common';
import { DbService } from '../db.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class JobsDbService {
  constructor(private dbService: DbService) {}

  async create(data: Prisma.JobCreateInput) {
    return this.dbService.job.create({ data });
  }

  async findAll() {
    return this.dbService.job.findMany();
  }

  async findOne(id: string) {
    return this.dbService.job.findUnique({ where: { id } });
  }

  async update(id: string, data: Prisma.JobUpdateInput) {
    return this.dbService.job.update({
      where: { id },
      data,
    });
  }
}
