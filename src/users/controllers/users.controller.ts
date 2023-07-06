import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { UserDTO, UserProjectDTO, UserUpdateDTO } from '../dto/users.dto';
import { PublicAccess } from 'src/auth/decorator/public.decorator';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorator/roles.decorator';

@Controller('users')
@UseGuards(AuthGuard, RolesGuard)
export class UsersController {
    constructor(private readonly usersService: UsersService){}
    
    @Post('register')
    public async registerUser(@Body() body: UserDTO){
        return await this.usersService.createUser(body)
    }

    @Post('useraddproject')
    public async userAddProject(@Body() body: UserProjectDTO){
        return await this.usersService.createUserAddProject(body)
    }

    @Roles('ADMIN')    
    @Get('all')
    public async findAllUsers(){
        return await this.usersService.findUser()

    }

    @PublicAccess()
    @Get(':userid')
    public async findUser(@Param('userid') id: string){
        return await this.usersService.findUserById(id)

    }

    @Put('edit/:userid')
    public async updateUser(
        @Param('userid') id: string,
        @Body() body: UserUpdateDTO
        ){
        return await this.usersService.updateUser(body, id)
    }

    @Delete('delete/:userid')
    public async deleteUser(@Param('userid') id:string){
        return await this.usersService.deleteUser(id)
    }
}
