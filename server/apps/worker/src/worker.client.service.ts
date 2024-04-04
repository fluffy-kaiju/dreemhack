import {
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Socket, io } from 'socket.io-client';

@Injectable()
export class WorkerClientService implements OnModuleInit, OnModuleDestroy {
  private readonly log = new Logger(WorkerClientService.name);
  private socket: Socket;

  constructor(private readonly config: ConfigService) {}

  async onModuleInit() {
    const masterWs = this.config.get<string>('MASTER_WS');
    this.log.verbose(
      `Trying to connect to master ${masterWs} as ${this.config.get<string>('WORKER_ID')}`,
    );

    this.socket = io(this.config.get<string>('MASTER_WS'), {
      extraHeaders: {
        'worker-id': this.config.get<string>('WORKER_ID'),
      },
    });

    this.socket.on('connect', () => {
      this.log.verbose('Connected to master');
    });

    this.socket.on('disconnect', () => {
      this.log.verbose('Disconnected from master');
    });

    this.socket.on('ping', () => {
      this.log.verbose('Ping from master');
      this.socket.emit('pong');
    });

    this.socket.on('scan:ports', (data) => {
      this.log.verbose('Scan ports');
      this.socket.emit('scan:ports', { status: 'done' });
    });
  }
  async onModuleDestroy() {}
}
