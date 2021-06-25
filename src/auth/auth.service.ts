import { BadRequestException, Inject, Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Db, ObjectID, Collection } from 'mongodb';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { Result } from '../result.interface';
import { JwtPayload } from './jwt-payload.interface';
import { hashPassword, matchPassword } from '../helpers';
import { UserInterface } from './interfaces/user.interface';
import { UpdateDetailsDto } from './dto/update-details.dto';


@Injectable()
export class AuthService {

  private readonly collection: Collection
  private logger = new Logger('AuthService');

  constructor(
    @Inject('DATABASE_CONNECTION')
    private db: Db,
    private jwtService: JwtService
  ) {
    this.collection = this.db.collection('users');
  }

  async register(authCredentialsDto: AuthCredentialsDto): Promise<Result<any>> {
    authCredentialsDto.password = await hashPassword(authCredentialsDto.password);
    authCredentialsDto.createdAt = new Date();
    authCredentialsDto.updatedAt = new Date();
    const user = await this.collection.insertOne(authCredentialsDto);

    const payload: JwtPayload = { id: user.ops[0]._id };
    const token = await this.jwtService.sign(payload);

    return {
      success: true,
      data: token
    };
  }

  async login(authCredentialsDto: AuthCredentialsDto): Promise<Result<any>> {
    const user = await this.collection.findOne({ email: authCredentialsDto.email });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Check if password matches
    const isMatch = await matchPassword(authCredentialsDto.password, user.password);

    if (!isMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload: JwtPayload = { id: user._id };
    const token = await this.jwtService.sign(payload);

    return {
      success: true,
      data: token
    };
  }

  async getMe(user: UserInterface): Promise<Result<UserInterface>> {
    const currentUser = await this.collection.findOne({
      _id: new ObjectID(user._id),
    });

    return {
      success: true,
      data: currentUser
    };
  }

  async updateDetails(updateDetailsDto: UpdateDetailsDto, user: UserInterface): Promise<Result<any>> {
    if (!ObjectID.isValid(user._id)) {
      throw new BadRequestException;
    }

    const currentUser = await this.collection.updateOne(
      {
        _id: new ObjectID(user._id),
      },
      {
        $set: {
          ...updateDetailsDto,
        },
      },
    );

    return {
      success: true,
      data: currentUser.result
    };
  }
}
