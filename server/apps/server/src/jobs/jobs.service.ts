import { Injectable } from '@nestjs/common';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { UsersModelService } from '@app/db/users/users.model.service';
import { $Enums } from '@prisma/client';

@Injectable()
export class JobsService {
  constructor(private readonly usersModel: UsersModelService) {}

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
    return `This action returns all jobs`;
  }

  findOne(id: number) {
    return `This action returns a #${id} job`;
  }

  update(id: number, updateJobDto: UpdateJobDto) {
    return `This action updates a #${id} job`;
  }

  remove(id: number) {
    return `This action removes a #${id} job`;
  }
}
