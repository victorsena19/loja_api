import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { UniqueEmail } from '../validate/uniqueEmail.validator';

export class CreateUserDTO {
  id: string;

  @MinLength(3, { message: 'O nome não pode ter menos que 3 caracteres' })
  @IsNotEmpty({ message: 'O nome não pode ser vazio' })
  name: string;

  @UniqueEmail({ message: 'Já existe um usuário com este e-mail' })
  @IsEmail(undefined, { message: 'O e-mail informado é invalido' })
  email: string;

  @MinLength(6, { message: 'A senha precisa ter pelo menos 6 caracteres' })
  password: string;
}
