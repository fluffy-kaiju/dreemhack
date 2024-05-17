import { BadGatewayException, Injectable } from '@nestjs/common';
import { JobsDbService } from './jobs.db.service';
import { Prisma, EJobStatus, EJobType } from '@prisma/client';

@Injectable()
export class JobsModelService {
  constructor(private readonly jobsDb: JobsDbService) {}

  /**
   * Init a new job request data
   *
   *
   * @param userId
   * @param workerId
   * @param name
   * @param description
   * @param type
   * @returns
   */
  async createNewJobRequest(
    userId: string,
    workerId: string,
    name: string,
    description: string,
    type: EJobType,
  ) {
    return this.jobsDb
      .create({
        name,
        description,
        status: EJobStatus.PENDING,
        type,
        user: {
          connect: {
            id: userId,
          },
        },
        worker: {
          connect: {
            id: workerId,
          },
        },
      })
      .then((val) => val.id)
      .catch((err) => {
        throw new BadGatewayException(err);
      });
  }

  async updateJobStatus(id: string, status: EJobStatus) {
    return this.jobsDb.update(id, { status }).then((val) => val.id);
  }

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
