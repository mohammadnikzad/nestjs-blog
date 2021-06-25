import { IsNotEmpty, IsOptional } from 'class-validator';
import { ObjectID } from 'mongodb';

export class CreatePostDto {

  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  image: string;

  @IsOptional()
  viewCount: number;

  @IsOptional()
  user: ObjectID;

  @IsOptional()
  createdAt: Date;

  @IsOptional()
  updatedAt: Date;
}
