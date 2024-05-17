import { JobsModelService } from '@app/db/jobs/jobs.model.service';
import { BadGatewayException, Injectable, Logger } from '@nestjs/common';
import { Ofa } from '@onefoall_wrapper/ofa';
import { EJobType } from '@prisma/client';

@Injectable()
export class SubdomainService {
  constructor(private readonly jobsModelService: JobsModelService) {}

  private readonly log: Logger = new Logger(SubdomainService.name);
  async create(domain: string) {
    //TODO push the jobs in the queue and only store the jobs data first

    this.jobsModelService.createNewJobRequest(
      'id',
      'workerid',
      'job name',
      'description',
      EJobType.SUBDOMAIN_SCAN,
    );

    //TODO add job to the queue
    // this.subdomainJobs.pushJob()

    // const oneforall = new Ofa();

    // const raw_res = await oneforall
    //   .run_param(domain, 'test_jobs', (taskProgress) => {
    //     console.log(taskProgress);
    //     // emit to master
    //   })
    //   .catch((err) => {
    //     this.log.error(err);
    //     throw new BadGatewayException(
    //       `Error running oneforall for ${domain}: ${err?.message || 'Error running oneforall'}`,
    //     );
    //   });
  }

  findAll() {
    return `This action returns all subdomain`;
  }

  findOne(id: number) {
    return `This action returns a #${id} subdomain`;
  }

  update(id: number, updateSubdomainDto: UpdateSubdomainDto) {
    return `This action updates a #${id} subdomain`;
  }

  remove(id: number) {
    return `This action removes a #${id} subdomain`;
  }
}
