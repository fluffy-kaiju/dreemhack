import { BadGatewayException, Injectable, Logger } from '@nestjs/common';
import { Ofa } from '@onefoall_wrapper/ofa';

@Injectable()
export class SubdomainService {
  private readonly log: Logger = new Logger(SubdomainService.name);
  async create(domain: string) {
    const oneforall = new Ofa();

    return await oneforall
      .run_param(domain, 'test_jobs', (taskProgress) => {
        console.log(taskProgress);
        // emit to master
      })
      .catch((err) => {
        this.log.error(err);
        throw new BadGatewayException(
          `Error running oneforall for ${domain}: ${err?.message || 'Error running oneforall'}`,
        );
      });
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
