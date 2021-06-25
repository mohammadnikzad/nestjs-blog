import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateDetailsDto {

  @IsString()
  @IsNotEmpty()
  name: string;
}
