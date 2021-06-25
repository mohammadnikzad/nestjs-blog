import { ApiProperty } from '@nestjs/swagger';
import { PostEntity } from './post.entity';

export class Data {

  @ApiProperty({
    example: true,
    description: 'Successfully'
  })
  success: boolean;

  @ApiProperty({
    example: [],
    description: 'All posts',
  })
  data: PostEntity[];
}