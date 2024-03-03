import { Logger, OnModuleInit } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway()
export class WorkerGateway
  implements OnModuleInit, OnGatewayConnection, OnGatewayDisconnect
{
  private readonly log = new Logger(WorkerGateway.name);

  async onModuleInit() {
    console.log('WorkerGateway Init');
  }

  async handleConnection(client: Socket) {
    this.log.verbose(`WorkerGateway Connected: ${client.id}`);
  }

  async handleDisconnect(client: Socket) {
    this.log.verbose(`WorkerGateway Disconnected: ${client.id}`);
  }

  @WebSocketServer()
  server: Server;
}
