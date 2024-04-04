import { Rfluff } from '@rfluff';
import * as fs from 'fs/promises';
import * as path from 'path';

export interface IOneForAllTaskProgress {
  log: string;
}

export class Ofa {
  constructor() {
    console.log('OneForAll');
  }

  private child_scan: Rfluff;

  //TODO Refactor way to get the 'OneForAll' output and remove the security vulnerability

  async run_param(
    target: string,
    jobId: string,
    statsCallback: (taskProgress: IOneForAllTaskProgress) => void,
  ) {
    if (!target) {
      throw new Error('Target is required');
    }

    if (!jobId) {
      throw new Error('JobId is required');
    }

    /**
     * WARNING!! There is a security vulnerability in the following code.
     * The code could be vulnerable to Path Traversal attack.
     * The variable `jobId` is used to construct the path to the temporary file.
     * An attacker could manipulate the `jobId` to write the file to any location on the filesystem.
     * The code should be refactored to use a secure method to construct the path to the temporary file.
     * Or find a other way to get the 'OneForAll' output.
     */
    const tmpExportFile = path.join('/tmp/', `${jobId}_export.json`);

    this.child_scan = new Rfluff();

    // This is the function that will be called each time the stdout of the child process is written
    this.child_scan.setStdoutCallback((data: string) => {
      try {
        if (data) {
          statsCallback({ log: data });
        }
      } catch (error) {
        throw new Error('Error parsing OneForAll output');
      }
    });

    // This is the function that will be called each time the stderr of the child process is written
    this.child_scan.setStderrCallback((data: string) => {
      console.error(`[${jobId}] stderr: ${data}`);
    });

    // python3 oneforall.py --target dreemcloud.net run --path /dev/null
    await this.child_scan.run_param('python3', [
      'libs/OneForAll/oneforall.py',
      '--target',
      target,
      '--fmt',
      'json',
      '--path',
      tmpExportFile,
      'run',
    ]);

    try {
      const data = await fs.readFile(tmpExportFile, 'utf8');
      fs.rm(tmpExportFile);
      return data;
    } catch (error) {
      throw new Error(`Error reading OneForAll output: ${error}`);
    }
  }
}
