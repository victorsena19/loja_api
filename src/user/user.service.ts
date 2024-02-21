import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { Repository } from 'typeorm';
import { ListUserDTO } from './dto/listUser.dto';
import { UpdateUserDTO } from './dto/updateUser.dto';
import { CreateUserDTO } from './dto/createUser.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async listUserById(id: string) {
    const userId = await this.userRepository.findOne({
      where: { id },
    });
    return userId;
  }

  async listUser() {
    const userSave = await this.userRepository.find();
    const usersList = userSave.map(
      (user) => new ListUserDTO(user.id, user.name),
    );
    return usersList;
  }

  async listUserByEmail(email: string) {
    const emailExist = this.userRepository.findOne({
      where: { email },
    });
    return emailExist;
  }

  async CreateUser(userData: CreateUserDTO) {
    const userEntity = new UserEntity();

    userEntity.name = userData.name;
    userEntity.email = userData.email;
    userEntity.password = userData.password;
    return this.userRepository.save(userEntity);
  }

  async UpdateUser(id: string, userData: UpdateUserDTO) {
    await this.userRepository.update(id, userData);
  }

  async DeleteUser(id: string) {
    await this.userRepository.delete(id);
  }
}
