import { Injectable } from '@nestjs/common';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { UsersModelService } from '@app/db/users/users.model.service';
import { $Enums } from '@prisma/client';
import { JobsModelService } from '@app/db/jobs/jobs.model.service';

@Injectable()
export class JobsService {
  constructor(
    private readonly usersModel: UsersModelService,
    private readonly jobsModel: JobsModelService,
  ) {}

  async create(createJobDto: CreateJobDto) {
    //WIP: run
    const status: $Enums.EJobStatus = 'PENDING';

    return this.usersModel.createJob(
      createJobDto.userId,
      createJobDto.name,
      createJobDto.description,
      status,
    );
  }

  findAll() {
    return this.jobsModel.findAll();
  }

  findOne(id: number) {
    return this.jobsModel.findOne(id);
  }

  update(id: number, updateJobDto: UpdateJobDto) {
    return `This action updates a #${id} job`;
  }

  remove(id: number) {
    return `This action removes a #${id} job`;
  }
}
