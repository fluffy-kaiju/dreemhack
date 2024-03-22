import { X2jOptions, XMLParser } from 'fast-xml-parser';
import { Rfluff } from '@rfluff';

export interface INmapTaskProgress {
  task: string;
  time: number;
  percent: number;
  remaining: number;
  etc: number;
}

export class Nmap {
  constructor() {
    console.log('Nmap');
  }

  private child: Rfluff;

  private parseTaskProgress(data: string) {
    const options = {
      ignoreAttributes: false,
      attributeNamePrefix: '',
      parseAttributeValue: true,
      // preserveOrder: true,
      // removeNSPrefix: true,
    } as X2jOptions;
    if (data.toString().includes('taskprogress')) {
      const test = new XMLParser(options).parse(data);
      const cleanedData = test.taskprogress;
      if (cleanedData) {
        const taskProgress: INmapTaskProgress = {
          task: cleanedData.task,
          time: cleanedData.time,
          percent: cleanedData.percent,
          remaining: cleanedData.remaining,
          etc: cleanedData.etc,
        };
        return taskProgress;
      }
    }
    return null;
  }

  async run_param(
    params: string[],
    statsCallback: (taskProgress: INmapTaskProgress) => void,
    statsEvery: `${number}s` = `1s`,
  ) {
    if (params.includes('--stats-every')) {
      throw new Error('Cannot use --stats-every');
    }

    if (params.includes('-oX')) {
      throw new Error('Cannot use -oX');
    }

    this.child = new Rfluff();

    // This is the function that will be called each time the stdout of the child process is written
    this.child.setStdoutCallback((data: string) => {
      try {
        const progess = this.parseTaskProgress(data);
        if (progess) {
          statsCallback(progess);
        }
      } catch (error) {
        throw new Error('Error parsing nmap output');
      }
    });

    // This is the function that will be called each time the stderr of the child process is written
    this.child.setStderrCallback((data: string) => {
      console.error(`stderr: ${data}`);
    });

    const res = await this.child.run_param('nmap', [
      '--stats-every',
      statsEvery,
      '-oX',
      '-',
      ...params,
    ]);

    return res.stdout;
  }
}
