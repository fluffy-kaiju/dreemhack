import { WorkerModelService } from '@app/db/worker/worker.model.service';
import { Injectable } from '@nestjs/common';
import { EWorkerStatus, Prisma } from '@prisma/client';

@Injectable()
export class OrchestraService {
  constructor(private readonly workerModel: WorkerModelService) {}

  async updateWorkerStatus(id: string, status: EWorkerStatus) {
    return this.workerModel.updateWorkerConnectionOrCreateIfNotExists(
      id,
      status,
    );
  }
}
