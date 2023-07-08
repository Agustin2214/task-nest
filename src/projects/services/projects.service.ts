import { Injectable } from '@nestjs/common';
import { ProjectsEntity } from '../entities/projects.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { ProjectDTO, ProjectUpdateDTO } from '../dto/projects.dto';
import { ErrorManager } from 'src/utils/error.manager';
import { UsersProjectsEntity } from 'src/users/entities/usersProjects.entity';
import { ACCESS_LEVEL } from 'src/constants/roles';
import { UsersService } from 'src/users/services/users.service';


@Injectable()
export class ProjectsService {
    
    constructor(
        @InjectRepository(ProjectsEntity) private readonly projectRepository: Repository<ProjectsEntity>,
        @InjectRepository(UsersProjectsEntity) private readonly userProjectRepository: Repository<UsersProjectsEntity>,
        private readonly usersService: UsersService
    ){}
    
    public async createProject(body: ProjectDTO,userId: string): Promise<ProjectDTO>{

        try{
            const user = await this.usersService.findUserById(userId)
            const project = await this.projectRepository.save(body)
            
            await this.userProjectRepository.save({
                    accessLevel: ACCESS_LEVEL.OWNER,
                    user:user,
                    project:project
                    
            })
            return project
        }
        catch(error){
            throw ErrorManager.createSignatureError(error.message)
        }
    }

    public async findProject(): Promise<ProjectDTO[]>{
        try{
            const project =  await this.projectRepository.find()
            if(project.length ===0){
                throw new ErrorManager({
                    type:'NOT_FOUND',
                    message:'No se encontro resultado'
                    })
            }

            return project
        }
        catch(error){
            throw ErrorManager.createSignatureError(error.message)
        }
    }



    public async findProjectById(id: string): Promise<ProjectDTO>{
        try{
            const project = await this.projectRepository
            .createQueryBuilder('project')
            .where({id:id})
            .leftJoinAndSelect('project.usersIncludes','usersIncludes')
            .leftJoinAndSelect('usersIncludes.user','user')
            .getOne();
            if(!project){
                throw new ErrorManager({
                    type:'NOT_FOUND',
                    message:'No se encontro resultado'
                    })
            }
            return project

        }
        catch(error){
            throw ErrorManager.createSignatureError(error.message)
        }
    }

    public async updateProject(id: string, body: ProjectUpdateDTO): Promise<UpdateResult | undefined >{
        try{
           const project: UpdateResult = await this.projectRepository.update(id,body)
           if(project.affected === 0){
             throw new ErrorManager({
                    type:'NOT_FOUND',
                    message:'No se puedo editar projecto o no existe'
                    })
        }
        return project

        }
        catch(error){
            throw ErrorManager.createSignatureError(error.message)
        }
    }

    public async deleteProject(id: string): Promise<DeleteResult | undefined >{
        try{
           const project: DeleteResult = await this.projectRepository.delete(id)
           if(project.affected === 0){
            throw new ErrorManager({
                    type:'NOT_FOUND',
                    message:'No se puedo eliminar projecto o no existe'
                    })
        }
        return project

        }
        catch(error){
            throw ErrorManager.createSignatureError(error.message)
        }
    }


}




