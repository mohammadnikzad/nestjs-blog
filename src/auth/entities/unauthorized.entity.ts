import { ApiProperty } from '@nestjs/swagger';

export class Unauthorized {

  @ApiProperty({ example: 401, description: 'Status code' })
  statusCode: boolean;

  @ApiProperty({
    example: 'Unauthorized',
    description: 'User not have a token',
  })
  message: string;
}