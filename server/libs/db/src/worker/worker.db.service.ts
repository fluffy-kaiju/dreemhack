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

  async editAllWorkersStatus(status: Prisma.WorkerUpdateInput) {
    //TODO UPDATE "Worker" SET "status" = 'OFFLINE'
    // https://www.prisma.io/docs/orm/prisma-client/queries/raw-database-access/raw-queries#executeraw
    return this.dbService
      .$executeRaw`UPDATE "Worker" SET "status" = ${status.status}::"EWorkerStatus"`;
  }
}
