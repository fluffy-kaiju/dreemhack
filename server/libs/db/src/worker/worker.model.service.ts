import { Injectable } from '@nestjs/common';
import { WorkerDbService } from './worker.db.service';
import { EWorkerStatus, Prisma } from '@prisma/client';

@Injectable()
export class WorkerModelService {
  constructor(private readonly workerDb: WorkerDbService) {}

  async create(data: Prisma.WorkerCreateInput) {
    return this.workerDb.create(data);
  }

  async findAll() {
    return this.workerDb.findAll();
  }

  async findOne(id: string) {
    return this.workerDb.findOne(id);
  }

  async update(id: string, data: Prisma.WorkerUpdateInput) {
    return this.workerDb.update(id, data);
  }

  async updateWorkerConnectionOrCreateIfNotExists(
    id: string,
    status: EWorkerStatus,
  ) {
    const worker = await this.findOne(id);
    console.log(worker);
    if (worker) {
      return this.update(id, { status });
    }
    return this.create({
      id: id,
      status: status,
    });
  }
}
