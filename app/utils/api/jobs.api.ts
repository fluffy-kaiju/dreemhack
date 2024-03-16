import type { UUID } from 'node:crypto';

export interface IJob {
  id: UUID;
}

export class JobsApi {
  constructor() {}
  private static readonly baseUrl = 'http://localhost:3000/jobs';

  public static async getJobs(): Promise<Array<IJob>> {
    const response = await fetch(this.baseUrl);
    console.log('Fetching jobs from API...', response);
    return await response.json();
  }
}
