import { ApiProperty } from '@nestjs/swagger';

export class Auth {

  @ApiProperty({
    example: true,
    description: 'Successfully'
  })
  success: boolean;

  @ApiProperty({
    example: 'jiwue12i3213k123123123',
    description: 'User token',
  })
  token: string;
}