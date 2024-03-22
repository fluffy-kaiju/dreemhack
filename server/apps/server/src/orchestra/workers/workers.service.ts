import { Injectable } from '@nestjs/common';
import { CreateWorkerDto } from './dto/create-worker.dto';
import { UpdateWorkerDto } from './dto/update-worker.dto';
import { WorkerModelService } from '@app/db/worker/worker.model.service';

@Injectable()
export class WorkersService {
  constructor(private readonly workerModel: WorkerModelService) {}
  async create(createWorkerDto: CreateWorkerDto) {
    return this.workerModel.create({
      name: createWorkerDto.name,
      status: createWorkerDto.status,
    });
  }

  async findAll() {
    return this.workerModel.findAll();
  }

  async findOne(id: string) {
    return this.workerModel.findOne(id);
  }

  async update(id: number, updateWorkerDto: UpdateWorkerDto) {
    return `This action updates a #${id} worker`;
  }

  async remove(id: number) {
    return `This action removes a #${id} worker`;
  }
}
