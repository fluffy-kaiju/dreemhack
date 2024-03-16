import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { Socket, io } from 'socket.io-client';

@Injectable()
export class WorkerClientService implements OnModuleInit, OnModuleDestroy {
  private socket: Socket;

  constructor() {}

  async onModuleInit() {
    this.socket = io('http://localhost:3000');
  }

  async onModuleDestroy() {}
}
