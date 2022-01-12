import { IsString } from 'class-validator';

export class DATFileForm {
  @IsString()
  public name: string;

  description?: string;

  version?: string;

  date?: Date;

  author?: string;

  homepage?: string;

  url?: string;

  @IsString()
  public path: string;
}
