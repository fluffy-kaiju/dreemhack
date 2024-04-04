import { ChildProcessWithoutNullStreams, spawn } from 'node:child_process';

export interface IRfluffResult {
  stdout: string;
  stderr: string;
  code: number;
}

export class Rfluff {
  constructor() {
    console.log('Rfluff');
    console.log(`cwd: ${process.cwd()}`);

    this.setStdoutCallback((data: string) => {
      console.log(data);
    });

    this.setStderrCallback((data: string) => {
      console.error(data);
    });
  }

  private child: ChildProcessWithoutNullStreams;
  private pid: number;
  private stdoutCallback: (data: string) => void;
  private stderrCallback: (data: string) => void;
  private stdOut: string = '';
  private stdErr: string = '';
  private cwd: string = process.cwd();
  //   private closeCallback: (code: number) => void;
  //   private errorCallback: (err: string) => void;

  private err(data: string) {
    if (this.child.exitCode === null) {
      const code = this.child.kill();
      if (code === false) {
        throw new Error(`Error killing nmap process ${this.child?.pid}`);
      }
    }
    throw new Error(data);
  }

  /**
   * The function will be call each time the stdout of the child process is written
   * @param callback The function to be called
   */
  setStdoutCallback(callback: (data: string) => void) {
    this.stdoutCallback = callback;
  }

  /**
   * The function will be call each time the stderr of the child process is written
   * @param callback The function to be called
   */
  setStderrCallback(callback: (data: string) => void) {
    this.stderrCallback = callback;
  }

  /**
   * Set the working directory where the child process will be executed, by default is the current working directory
   * @param cwd The working directory where the child process will be executed
   */
  setWorkingDirectory(cwd: string) {
    this.cwd = cwd;
  }

  //   setCloseCallback(callback: (code: number) => void) {
  //     this.closeCallback = callback;
  //   }

  //   setErrorCallback(callback: (err: string) => void) {
  //     this.errorCallback = callback;
  //   }

  async run_param(
    bin: string,
    params: string[],
    // statsCallback: (taskProgress: INmapTaskProgress) => void,
  ): Promise<IRfluffResult> {
    return new Promise<IRfluffResult>((resolve, reject) => {
      this.child = spawn(bin, [...params], {
        cwd: this.cwd,
      });

      // Listen for stdout writes
      // Execute the callback function each time the stdout of the child process is written
      this.child.stdout.on('data', (out: string) => {
        try {
          const outStr = out.toString();
          if (outStr) {
            this.stdoutCallback(outStr);
            this.stdOut += outStr;
          }
        } catch (error) {
          reject(error);
        }
      });

      // Listen for stderr writes
      // Execute the callback function each time the stderr of the child process is written
      this.child.stderr.on('data', (data) => {
        try {
          const dataStr = data.toString();
          if (dataStr) {
            this.stderrCallback(dataStr);
            this.stdErr += dataStr;
          }
        } catch (error) {
          reject(error);
        }
      });

      this.child.on('error', (err: string) => {
        reject(err);
      });

      this.child.on('close', (code: number) => {
        console.log(`child process exited with code ${code}`);
        if (code !== 0) {
          // Handle non-zero exit code if needed
        }
        const result: IRfluffResult = {
          stdout: this.stdOut,
          stderr: this.stdErr,
          code: code,
        };
        resolve(result);
      });
    });
  }
}
