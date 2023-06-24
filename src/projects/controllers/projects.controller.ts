import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ProjectsService } from '../services/projects.service';
import { ProjectDTO, ProjectUpdateDTO } from '../dto/projects.dto';

@Controller('projects')
export class ProjectsController {
    constructor(private readonly projectService: ProjectsService){}

    @Post('register')
    public async createProject(@Body() body: ProjectDTO){
        return await this.projectService.createProject(body)
    }

    @Get('all')
    public async findAllProjects(){
        return await this.projectService.findProject()

    }

    @Get(':id')
    public async findProject(@Param('id') id: string){
        return await this.projectService.findProjectById(id)

    }

    @Put('edit/:id')
    public async updateProject(
        @Param('id') id: string,
        @Body() body: ProjectUpdateDTO
        ){
        return await this.projectService.updateProject(id, body)
    }

    @Delete('delete/:id')
    public async deleteUser(@Param('id') id:string){
        return await this.projectService.deleteProject(id)
    }

}
