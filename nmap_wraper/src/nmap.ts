import { X2jOptions, XMLParser } from 'fast-xml-parser';
import { ChildProcessWithoutNullStreams, spawn } from 'node:child_process';
import { log } from 'node:console';
import { UUID, privateDecrypt } from 'node:crypto';

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

  private child: ChildProcessWithoutNullStreams;
  private pid: number;

  private err(data: string) {
    if (this.child.exitCode === null) {
      const code = this.child.kill();
      if (code === false) {
        throw new Error(`Error killing nmap process ${this.child?.pid}`);
      }
    }
    throw new Error(data);
  }

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

  async run_param(params: string[], statsCallback: (taskProgress: INmapTaskProgress) => void, statsEvery: `${number}s`= `1s`) {
    return new Promise((resolve, reject) => {

      if (params.includes('--stats-every')) {
        reject('Cannot use --stats-every');
      }

      if (params.includes('-oX')) {
        reject('Cannot use -oX');
      }

      this.child = spawn(
        'nmap',
        [
          '--stats-every',
          '1s',
          '-oX',
          '-',
          ...params,
        ],
      );


      let dataStr = '';

      this.child.stdout.on('data', (out: string) => {

        try {
          // console.log(out.toString());
          const progess = this.parseTaskProgress(out.toString());
          if (progess) {
            statsCallback(progess);
          }
          dataStr += out;
        } catch (error) {
          reject('Error parsing nmap output')
        }
      });

      this.child.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`);
        reject(data?.toString() || 'Unknown error');
      });

      this.child.on('error', (err: string) => {
        console.log(`err ${err}`);

        reject(err);
      });

      this.child.on('close', (code: number) => {
        console.log(`child process exited with code ${code}`);
        if (code !== 0) {
          reject(`child process exited with code ${code}`);
        }
        try {
          const options = {
          ignoreAttributes: false,
          attributeNamePrefix: '',
          parseAttributeValue: true,
          // preserveOrder: true,
          // removeNSPrefix: true,
          } as X2jOptions;

            const test = new XMLParser(options).parse(dataStr);
            resolve(test);
        } catch (error) {
          throw new Error('Error parsing nmap output');
        }
      });
    })
    .catch((err) => {
      this.err(err);
    })
  }
}