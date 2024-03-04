import { WebSocketGateway, SubscribeMessage, MessageBody } from '@nestjs/websockets';
import { OrchestraService } from './orchestra.service';
import { CreateOrchestraDto } from './dto/create-orchestra.dto';
import { UpdateOrchestraDto } from './dto/update-orchestra.dto';

@WebSocketGateway()
export class OrchestraGateway {
  constructor(private readonly orchestraService: OrchestraService) {}

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
    return this.orchestraService.update(updateOrchestraDto.id, updateOrchestraDto);
  }

  @SubscribeMessage('removeOrchestra')
  remove(@MessageBody() id: number) {
    return this.orchestraService.remove(id);
  }
}
