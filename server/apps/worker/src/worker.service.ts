import { BadGatewayException, Injectable } from '@nestjs/common';
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
      const ls = spawn('nmap', ['172.22.0.2/24'], {
        shell: true,
      });

      let dataStr = '';

      const loop = setInterval(() => {
        ls.stdin.write('y');
        ls.stdin.end();
        log('y');
      }, 1000);

      ls.stdout.on('data', (data) => {
        console.log(`stdout: ${data}`);
        dataStr += data;
      });

      ls.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`);
      });

      ls.on('error', (err) => {
        console.log(`err ${err}`);

        clearInterval(loop);
        reject(err);
      });

      ls.on('close', (code) => {
        console.log(`child process exited with code ${code}`);
        clearInterval(loop);
        resolve(dataStr);
      });
    });
  }
}
