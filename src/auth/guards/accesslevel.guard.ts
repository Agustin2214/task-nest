import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { ACCESS_KEY, ADMIN_KEY, PUBLIC_KEY, ROLES_KEY } from 'src/constants/key-decorator';
import { ROLES } from 'src/constants/roles';
import { UsersService } from 'src/users/services/users.service';

@Injectable()
export class AccesLevelGuard implements CanActivate {
  constructor ( private readonly reflector: Reflector,private readonly userService: UsersService){}

async  canActivate(
    context: ExecutionContext,
  ):  Promise<boolean>  {
  
  const isPublic = this.reflector.get<boolean>(PUBLIC_KEY,context.getHandler())

  if(isPublic){
    return true
  }

  const roles = this.reflector.get<Array<keyof typeof ROLES>>(ROLES_KEY,context.getHandler())

  const accessLevel = this.reflector.get<Number>(ACCESS_KEY,context.getHandler())

  const admin = this.reflector.get<string>(ADMIN_KEY,context.getHandler())


  const req = context.switchToHttp().getRequest<Request>()

  const {roleUser,idUser} = req

if(!accessLevel){
  if(roles === undefined){
    if(!admin){
      return true
    }
   else if(admin && roleUser === admin){
    return true
  } else {
    throw new UnauthorizedException('Permiso Invalido')
  }
}
}

  if(roleUser === ROLES.ADMIN) return true


  const user = await this.userService.findUserById(idUser)

  const userInproject = user.projectsIncludes.find((project => project.project.id === req.params.projectid))

   if(!userInproject){
     throw new UnauthorizedException('No tienes permisos en este proyecto')
   }

   if(accessLevel !== userInproject.accessLevel){
    throw new UnauthorizedException('No tienes permisos suficientes para realizar esta accion')

   }

  return true


  }
}
