import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { UserService } from './user.service';
import { UniqueEmailValidator } from './validate/uniqueEmail.validator';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [UserService, UniqueEmailValidator],
})
export class UserModule {}
