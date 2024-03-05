import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersModelService } from '@app/db/users/users.model.service';

@Injectable()
export class UsersControllerService {
  constructor(private readonly userDb: UsersModelService) {}

  create(createUserDto: CreateUserDto) {
    return this.userDb.createUser(createUserDto.name);
  }

  findAll() {
    return this.userDb.getUsers();
  }

  findOne(id: string) {
    return this.userDb.getUser(id);
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.userDb.updateUser(id, updateUserDto);
  }

  remove(id: string) {
    return this.userDb.deleteUser(id);
  }
}
