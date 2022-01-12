import { IsString } from 'class-validator';

export class ROMSetForm {
  @IsString()
  public name: string;

  @IsString()
  public path: string;
}
