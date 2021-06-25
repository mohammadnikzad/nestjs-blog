import { ApiProperty } from '@nestjs/swagger';

export class User {

  @ApiProperty({
    example: "test@gmail.com",
    description: 'User email'
  })
  email: string;

  @ApiProperty({
    example: '2021-06-25T14:17:45.179Z',
    description: 'User createdAt',
  })
  createdAt: string;

  @ApiProperty({
    example: '2021-06-25T14:17:45.179Z',
    description: 'User updatedAt'
  })
  updatedAt: string;
}