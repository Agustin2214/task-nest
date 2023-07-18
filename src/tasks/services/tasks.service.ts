import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TasksEntity } from '../entities/tasks.entity';
import { Repository } from 'typeorm';
import { ProjectsService } from 'src/projects/services/projects.service';
import { TasksDto } from '../dto/tasks.dto';
import { ErrorManager } from 'src/utils/error.manager';
import { ProjectsEntity } from 'src/projects/entities/projects.entity';
import { error } from 'console';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TasksEntity)
    private readonly taskRepository: Repository<TasksEntity>,
    private readonly projectService: ProjectsService,
  ) {}

  public async createTask(
    body: TasksDto,
    projectId: string,
  ): Promise<TasksEntity> {
      
    const project = await this.projectService.findProjectById(projectId);
 
    try {
          
      return await this.taskRepository.save({
        ...body,
        project,
      });
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }
}