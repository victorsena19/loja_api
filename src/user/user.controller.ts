import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDTO } from './dto/updateUser.dto';
import { CreateUserDTO } from './dto/createUser.dto';
import { ListUserDTO } from './dto/listUser.dto';

@Controller('/user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  async getUsers() {
    const listUser = this.userService.listUser();
    return listUser;
  }

  @Get('/:id')
  async getUserId(@Param('id') id: string) {
    const listUserId = this.userService.listUserById(id);
    return listUserId;
  }

  @Post()
  async createUser(@Body() userData: CreateUserDTO) {
    const UserData = await this.userService.CreateUser(userData);
    return {
      user: new ListUserDTO(userData.id, userData.name),
      message: 'usuário criado com sucesso',
    };
  }

  @Put('/:id')
  async updateUser(@Param('id') id: string, @Body() newData: UpdateUserDTO) {
    const updatedUser = await this.userService.UpdateUser(id, newData);
    return {
      updatedUser,
      message: 'usuário atualizado com sucesso',
    };
  }
}
