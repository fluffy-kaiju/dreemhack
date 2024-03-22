import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { OrchestraService } from './orchestra.service';
import { CreateOrchestraDto } from './dto/create-orchestra.dto';
import { UpdateOrchestraDto } from './dto/update-orchestra.dto';
import { Logger } from '@nestjs/common';

@WebSocketGateway()
export class OrchestraGateway {
  private readonly log = new Logger(OrchestraGateway.name);
  constructor(private readonly orchestraService: OrchestraService) {}

  handleConnection(client: Socket) {
    this.log.debug(
      `Client connected: ${client.handshake.headers?.['worker-id'] ?? 'Anonymous'} ${client.handshake.address}`,
    );
  }

  handleDisconnect(client: Socket) {
    this.log.debug(
      `Client disconnected: ${client.handshake.headers?.['worker-id'] ?? 'Anonymous'} ${client.handshake.address}`,
    );
  }

  @SubscribeMessage('createOrchestra')
  create(@MessageBody() createOrchestraDto: CreateOrchestraDto) {
    return this.orchestraService.create(createOrchestraDto);
  }

  @SubscribeMessage('findAllOrchestra')
  findAll() {
    return this.orchestraService.findAll();
  }

  @SubscribeMessage('findOneOrchestra')
  findOne(@MessageBody() id: number) {
    return this.orchestraService.findOne(id);
  }

  @SubscribeMessage('updateOrchestra')
  update(@MessageBody() updateOrchestraDto: UpdateOrchestraDto) {
    return this.orchestraService.update(
      updateOrchestraDto.id,
      updateOrchestraDto,
    );
  }

  @SubscribeMessage('removeOrchestra')
  remove(@MessageBody() id: number) {
    return this.orchestraService.remove(id);
  }
}
