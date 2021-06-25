import { BadRequestException, Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { PostInterface } from './interfaces/post.interface';
import { Result } from '../result.interface';
import { CreatePostDto } from './dto/create-post.dto';
import { Db, ObjectID, Collection } from 'mongodb';
import { UserInterface } from '../auth/interfaces/user.interface';

@Injectable()
export class PostsService {

  private readonly collection: Collection
  private logger = new Logger('ProductsService');

  constructor(
    @Inject('DATABASE_CONNECTION')
    private db: Db,
  ) {
    this.collection = this.db.collection('posts');
  }

  async getPosts(): Promise<Result<PostInterface[]>> {
    const posts = await this.collection.aggregate([
      {
        $lookup: {
            from: 'users',
            localField:  'user',
            foreignField: '_id',
            as: 'user'
          }
      }
    ]).toArray();

    return {
      success: true,
      data: posts
    };
  }

  async getPost(id: string): Promise<Result<PostInterface>> {
    if (!ObjectID.isValid(id)) {
      throw new BadRequestException;
    }

    const post = await this.collection.findOne({
      _id: new ObjectID(id),
    });

    if (!post) {
      throw new NotFoundException(`Product with ID "${id}" not found`);
    }

    return {
      success: true,
      data: post
    };
  }

  async createPost(createPostDto: CreatePostDto, user: UserInterface): Promise<Result<PostInterface>> {
    createPostDto.user = user._id;
    createPostDto.createdAt = new Date();
    createPostDto.updatedAt = new Date();
    const result = await this.collection.insertOne(createPostDto);
    return {
      success: true,
      data: result.ops[0]
    };
  }

  async updatePost(id: string, createPostDto: CreatePostDto): Promise<Result<PostInterface>> {
    if (!ObjectID.isValid(id)) {
      throw new BadRequestException;
    }

    const post = await this.collection.updateOne(
      {
        _id: new ObjectID(id),
      },
      {
        $set: {
          ...createPostDto,
        },
      },
    );

    return {
      success: true,
      data: post.result
    };
  }

  async deletePost(id: string): Promise<Result<any>> {
    if (!ObjectID.isValid(id)) {
      throw new BadRequestException;
    }

    const response = await this.collection.deleteOne({
      _id: new ObjectID(id),
    });

    if (response.deletedCount === 0) {
      throw new NotFoundException;
    }

    return {
      success: true,
      data: {}
    };
  }
}
