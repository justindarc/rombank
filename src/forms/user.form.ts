import { IsEmail, IsString } from 'class-validator';

export class UserForm {
  @IsEmail()
  public email: string;

  @IsString()
  public password: string;
}
