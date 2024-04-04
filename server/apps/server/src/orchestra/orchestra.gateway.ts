import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { OrchestraService } from './orchestra.service';
import { Logger, OnModuleInit } from '@nestjs/common';
import { EWorkerStatus } from '@prisma/client';

@WebSocketGateway({
  namespace: 'orchestra',
})
export class OrchestraGateway implements OnModuleInit {
  private readonly log = new Logger(OrchestraGateway.name);
  constructor(private readonly orchestraService: OrchestraService) {}

  // Get ws server
  @WebSocketServer()
  server: Server;

  async onModuleInit() {
    //TODO: onModuleInit or destroy fetch reset all workers status to offline

    this.orchestraService.resetAllWorkersStatus();

    setInterval(() => {
      this.server.emit('ping');
      this.log.verbose('Ping to all workers');
    }, 30 * 1000);
  }

  async handleConnection(client: Socket) {
    const workerId =
      client.handshake.headers?.['worker-id']?.toString() ?? 'Anonymous';
    this.log.verbose(
      `Client connected: ${workerId} ${client.handshake.address}`,
    );
    this.orchestraService.updateWorkerStatus(workerId, EWorkerStatus.ONLINE);
  }

  async handleDisconnect(client: Socket) {
    const workerId =
      client.handshake.headers?.['worker-id']?.toString() ?? 'Anonymous';
    this.log.verbose(
      `Client disconnected: ${workerId} ${client.handshake.address}`,
    );
    this.orchestraService.updateWorkerStatus(workerId, EWorkerStatus.OFFLINE);
  }

  //   @SubscribeMessage('createOrchestra')
  //   create(@MessageBody() createOrchestraDto: CreateOrchestraDto) {
  //     return this.orchestraService.create(createOrchestraDto);
  //   }
  @SubscribeMessage('pong')
  pong(client: Socket) {
    const workerId =
      client.handshake.headers?.['worker-id']?.toString() ?? 'Anonymous';
    this.log.verbose(
      `Pong from ${client.id} ${client.handshake.address} ${workerId}`,
    );
    this.orchestraService.updateWorkerStatus(workerId, EWorkerStatus.ONLINE);
  }
}
