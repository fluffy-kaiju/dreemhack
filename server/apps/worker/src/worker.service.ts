import { BadGatewayException, Injectable } from '@nestjs/common';
import { X2jOptions, XMLParser, validationOptions } from 'fast-xml-parser';
import { spawn } from 'node:child_process';
import { log } from 'node:console';

@Injectable()
export class WorkerService {
  async getHello() {
    return await this.test()
      .catch((err) => {
        throw new BadGatewayException(err?.message);
      })
      .then((data) => {
        return data;
      });
  }

  async test() {
    return new Promise((resolve, reject) => {
      const ls = spawn(
        'nmap',
        [
          '--stats-every',
          '1s',
          '-T4',
          '-A',
          '-p',
          '1-1000',
          '-oX',
          '-',
          'scanme.nmap.org',
        ],
        // ['--stats-every', '1s', '-oX', '-', '172.22.0.2/24'],
        // {
        // shell: true,
        // },
      );

      let dataStr = '';

      // const loop = setInterval(() => {
      //   ls.stdin.write('y');
      //   ls.stdin.end();
      //   log('y');
      // }, 1000);

      ls.stdout.on('data', (data) => {
        // console.log(`stdout: ${data}`);
        const options = {
          ignoreAttributes: false,
          attributeNamePrefix: '',
          parseAttributeValue: true,
          // preserveOrder: true,
          // removeNSPrefix: true,
        } as X2jOptions;
        if (data.toString().includes('taskprogress')) {
          log(data.toString());
          const test = new XMLParser(options).parse(data);
          log(test);
          const cleanedData = test.taskprogress;
          console.log(cleanedData);
        }
        dataStr += data;
      });

      ls.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`);
      });

      ls.on('error', (err) => {
        console.log(`err ${err}`);

        // clearInterval(loop);
        reject(err);
      });

      ls.on('close', (code) => {
        console.log(`child process exited with code ${code}`);
        // clearInterval(loop);
        resolve(dataStr);
      });
    });
  }
}
