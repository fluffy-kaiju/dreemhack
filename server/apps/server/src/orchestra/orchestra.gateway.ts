import { WebSocketGateway } from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { OrchestraService } from './orchestra.service';
import { Logger } from '@nestjs/common';
import { EWorkerStatus } from '@prisma/client';

@WebSocketGateway()
export class OrchestraGateway {
  private readonly log = new Logger(OrchestraGateway.name);
  constructor(private readonly orchestraService: OrchestraService) {}

  //TODO: onModuleInit or destroy fetch reset all workers status to offline

  handleConnection(client: Socket) {
    const workerId =
      client.handshake.headers?.['worker-id'].toString() ?? 'Anonymous';
    this.log.debug(`Client connected: ${workerId} ${client.handshake.address}`);
    this.orchestraService.updateWorkerStatus(workerId, EWorkerStatus.ONLINE);
  }

  handleDisconnect(client: Socket) {
    const workerId =
      client.handshake.headers?.['worker-id'].toString() ?? 'Anonymous';
    this.log.debug(
      `Client disconnected: ${workerId} ${client.handshake.address}`,
    );
    this.orchestraService.updateWorkerStatus(workerId, EWorkerStatus.OFFLINE);
  }

  //   @SubscribeMessage('createOrchestra')
  //   create(@MessageBody() createOrchestraDto: CreateOrchestraDto) {
  //     return this.orchestraService.create(createOrchestraDto);
  //   }
}
