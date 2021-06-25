import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Post,
  Put,
  UseGuards
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostInterface } from './interfaces/post.interface';
import { CreatePostDto } from './dto/create-post.dto';
import { Result } from '../result.interface';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../auth/get-user.decorator';
import { UserInterface } from '../auth/interfaces/user.interface';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Data } from './entities/data.entity';
import { PostEntity } from './entities/post.entity';

@ApiTags('posts')
@Controller('posts')
export class PostsController {

  private logger = new Logger('TasksController');

  constructor(private postsService: PostsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all posts' })
  @ApiResponse({
    status: 200,
    description: 'Get all posts',
    type: Data
  })
  getPosts(): Promise<Result<PostInterface[]>> {
    return this.postsService.getPosts();
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Get single post' })
  @ApiResponse({
    status: 200,
    description: 'Get single post',
    type: Data
  })
  getPost(
    @Param('id') id: string,
  ): Promise<Result<PostInterface>> {
    return this.postsService.getPost(id);
  }

  @Post()
  @UseGuards(AuthGuard())
  @ApiOperation({ summary: 'Create new post' })
  @ApiBody({
    type: PostEntity
  })
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'Create new post',
    type: Data
  })
  createPost(
    @Body() createPostDto: CreatePostDto,
    @GetUser() user: UserInterface
  ): Promise<Result<PostInterface>> {
    return this.postsService.createPost(createPostDto, user);
  }

  @Put('/:id')
  @UseGuards(AuthGuard())
  @ApiOperation({ summary: 'Update post' })
  @ApiBody({
    type: PostEntity
  })
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'Update post',
    type: Data
  })
  updatePost(
    @Param('id') id: string,
    @Body() createPostDto: CreatePostDto
  ): Promise<Result<PostInterface>> {
    return this.postsService.updatePost(id, createPostDto);
  }

  @Delete('/:id')
  @UseGuards(AuthGuard())
  @ApiOperation({ summary: 'Update post' })
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'Delete post'
  })
  deletePost(
    @Param('id') id: string
  ): Promise<Result<any>> {
    return this.postsService.deletePost(id);
  }
}
