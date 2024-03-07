import { Injectable } from '@nestjs/common';
import { JobsDbService } from './jobs.db.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class JobsModelService {
  constructor(private readonly jobsDb: JobsDbService) {}

  async findAll() {
    return this.jobsDb.findAll();
  }

  async findOne(id: string) {
    return this.jobsDb.findOne(id);
  }

  async update(id: string, data: Prisma.JobUpdateInput) {
    return this.jobsDb.update(id, data);
  }
}
