import { PassportStrategy } from '@nestjs/passport';
import { Db, ObjectID, Collection } from 'mongodb';
import {  Strategy, ExtractJwt } from 'passport-jwt';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtPayload } from './jwt-payload.interface';
import { UserInterface } from './interfaces/user.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

  private readonly collection: Collection

  constructor(
    @Inject('DATABASE_CONNECTION')
    private db: Db,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET
    });
    this.collection = this.db.collection('users')
  }

  async validate(payload: JwtPayload): Promise<UserInterface> {
    const { id } = payload;
    const user = await this.collection.findOne({
      _id: new ObjectID(id),
    });

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
