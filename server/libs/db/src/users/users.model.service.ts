import { Injectable } from '@nestjs/common';
import { UsersDbService } from './users.service';
import { JobsDbService } from '../jobs/jobs.db.service';
import { $Enums, Prisma } from '@prisma/client';

@Injectable()
export class UsersModelService {
  constructor(
    private readonly usersDb: UsersDbService,
    private readonly jobsDb: JobsDbService,
  ) {}

  async createUser(name: string) {
    const user: Prisma.UserCreateInput = {
      name,
    };

    return this.usersDb.createUser(user);
  }

  async getUsers() {
    return this.usersDb.getUsers();
  }

  async getUser(id: string) {
    return this.usersDb.getUser(id);
  }

  async getUserJobs(userId: string) {
    return this.usersDb.getUserJobs(userId);
  }

  async updateUser(id: string, data: Prisma.UserUpdateInput) {
    return this.usersDb.updateUser(id, data);
  }

  async deleteUser(id: string) {
    return this.usersDb.deleteUser(id);
  }

  async createJob(
    userId: string,
    name: string,
    description: string,
    status: $Enums.EJobStatus,
  ) {
    const job: Prisma.JobCreateInput = {
      name,
      description,
      status,
      user: {
        connect: { id: userId },
      },
    };

    return this.jobsDb.create(job);
  }
}
