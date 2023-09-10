
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { IUser } from '../../common/interfaces/user.interface';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    ) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles || !roles.length) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user: IUser = request.user;
    if(!user){
      return false;
    }
    return user.role && roles.includes(user.role);
  }

}