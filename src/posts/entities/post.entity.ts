import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../auth/entities/user.entity';

export class PostEntity {

  @ApiProperty({
    example: 'Hello World',
    description: 'Post title'
  })
  title: boolean;

  @ApiProperty({
    example: 'This is a description',
    description: 'Post description',
  })
  description: string;

  @ApiProperty({
    example: 'https://google.com/logo.png',
    description: 'Post image',
  })
  image: string;
}