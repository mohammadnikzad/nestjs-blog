import { Body, Controller, Get, Post, Put, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiBody
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { Result } from '../result.interface';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { AuthGuard } from '@nestjs/passport';
import { UpdateDetailsDto } from './dto/update-details.dto';
import { GetUser } from './get-user.decorator';
import { UserInterface } from './interfaces/user.interface';
import { Auth } from './entities/auth.entity';
import { Unauthorized } from './entities/unauthorized.entity';
import { User } from './entities/user.entity';
import { AuthBody } from './entities/auth-body.entity';

@ApiTags('auth')
@Controller('auth')
export class AuthController {

  constructor(
    private authService: AuthService
  ) {}

  @Post('/register')
  @ApiBody({
    type: AuthBody
  })
  @ApiOperation({ summary: 'User register' })
  @ApiResponse({
    status: 200,
    description: 'User register',
    type: Auth
  })
  signUp(
    @Body() authCredentialsDto: AuthCredentialsDto
  ): Promise<Result<any>> {
    return this.authService.register(authCredentialsDto);
  }

  @Post('/login')
  @ApiBody({
    type: AuthBody
  })
  @ApiResponse({
    status: 200,
    description: 'User login',
    type: Auth
  })
  @ApiOperation({ summary: 'User login' })
  signIn(@Body() authCredentialsDto: AuthCredentialsDto): Promise<Result<any>> {
    return this.authService.login(authCredentialsDto);
  }

  @Get('/me')
  @ApiOperation({ summary: 'User get me' })
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'User get me',
    type: User
  })
  @ApiResponse({
    status: 401,
    description: 'User failed',
    type: Unauthorized
  })
  @UseGuards(AuthGuard())
  getMe(
    @GetUser() user: UserInterface
  ): Promise<Result<UserInterface>> {
    return this.authService.getMe(user);
  }

  @Put('/updateDetails')
  @ApiOperation({ summary: 'User updateDetails' })
  @ApiBearerAuth()
  @ApiResponse({
    status: 401,
    description: 'User failed',
    type: Unauthorized
  })
  @UseGuards(AuthGuard())
  updateDetails(
    @Body() updateDetailsDto: UpdateDetailsDto,
    @GetUser() user: UserInterface
  ) {
    return this.authService.updateDetails(updateDetailsDto, user);
  }
}
