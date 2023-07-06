import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ProjectsService } from '../services/projects.service';
import { ProjectDTO, ProjectUpdateDTO } from '../dto/projects.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { AccesLevelGuard } from 'src/auth/guards/accesslevel.guard';
import { AccessLevel } from 'src/auth/decorator/access_level.decorator';

@Controller('projects')
@UseGuards(AuthGuard,RolesGuard,AccesLevelGuard)
export class ProjectsController {
    constructor(private readonly projectService: ProjectsService){}

    @Post('create')
    public async createProject(@Body() body: ProjectDTO){
        return await this.projectService.createProject(body)
    }

    @Get('all')
    public async findAllProjects(){
        return await this.projectService.findProject()

    }

    @Get(':projectid')
    public async findProject(@Param('projectid') id: string){
        return await this.projectService.findProjectById(id)

    }

    @AccessLevel(50)
    @Put('edit/:projectid')
    public async updateProject(
        @Param('projectid') id: string,
        @Body() body: ProjectUpdateDTO
        ){
        return await this.projectService.updateProject(id, body)
    }

    @Delete('delete/:projectid')
    public async deleteUser(@Param('projectid') id:string){
        return await this.projectService.deleteProject(id)
    }

}
