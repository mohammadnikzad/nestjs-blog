import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserInterface } from './interfaces/user.interface';

export const GetUser = createParamDecorator((data: unknown, ctx: ExecutionContext): UserInterface => {
  const request = ctx.switchToHttp().getRequest();
  return request.user;
});
