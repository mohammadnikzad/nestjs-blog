import { ApiProperty } from '@nestjs/swagger';

export class AuthBody {

  @ApiProperty({
    example: "test@gmail.com",
    description: 'User email'
  })
  email: string;

  @ApiProperty({
    example: '123456789',
    description: 'User password',
  })
  password: string;
}