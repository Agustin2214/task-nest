import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersEntity } from '../entities/users.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { UserDTO, UserUpdateDTO } from '../dto/users.dto';
import { ErrorManager } from 'src/utils/error.manager';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UsersEntity) private readonly userRepository: Repository<UsersEntity>,
    ){}

    public async createUser(body: UserDTO): Promise<UsersEntity>{
        try{
            return await this.userRepository.save(body)
        }
        catch(error){
            throw ErrorManager.createSignatureError(error.message)
        }
    }


    public async findUser(): Promise<UsersEntity[]>{
        try{
            const user: UsersEntity[] = await this.userRepository.find()
            if(user.length===0){
                throw new ErrorManager({
                    type:'NOT_FOUND',
                    message:'No se encontro resultado'
                })
            }

            return user
        }
        catch(error){
            throw ErrorManager.createSignatureError(error.message)
    }
}


    public async findUserById(id: string): Promise<UsersEntity>{
        try{
            
            const user : UsersEntity = await this.userRepository
            .createQueryBuilder('user')
            .where({id:id})
            .getOne();

            if(!user){
                throw new ErrorManager({
                    type:'NOT_FOUND',
                    message:'No se encontro Usuario'
                })
            }

            return user
            
        }
        catch(error){
            throw ErrorManager.createSignatureError(error.message)
        }
    }


    public async updateUser(body: UserUpdateDTO ,id: string): Promise<UpdateResult | undefined>{
        try{
            const user: UpdateResult = await this.userRepository.update(id,body)
            if(user.affected === 0){
                throw new ErrorManager({
                    type:'BAD_REQUEST',
                    message:'No se pudo actualizar el usuario'
                })
            }
            return user
        }
        catch(error){
            throw ErrorManager.createSignatureError(error.message)
        }
    }



    public async deleteUser(id: string): Promise<DeleteResult | undefined>{
        try{
            const user: DeleteResult = await this.userRepository.delete(id)
            if(user.affected === 0){
                throw new ErrorManager({
                    type:'BAD_REQUEST',
                    message:'No se pudo eliminar usuario'
                })
            }
            return user
        }
        catch(error){
            throw ErrorManager.createSignatureError(error.message)
        }
    }


}
