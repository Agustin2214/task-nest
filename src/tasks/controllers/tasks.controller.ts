
//import { AccesLevelGuard } from 'src/auth/guards/accesslevel.guard';


import { Body, Controller, Param, Post, UseGuards } from '@nestjs/common';
import { AccessLevel } from 'src/auth/decorator/access_level.decorator';
import { AccesLevelGuard } from 'src/auth/guards/accesslevel.guard';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { TasksDto } from '../dto/tasks.dto';
import { TasksService } from '../services/tasks.service';

@Controller('tasks')
@UseGuards(AuthGuard, RolesGuard, AccesLevelGuard)
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}


  @AccessLevel('DEVELOPER')
  @Post('create/:projectId')
  public async createTask(
    @Body() body: TasksDto,
    @Param('projectId') projectId: string,
  ) {
    return this.tasksService.createTask(body, projectId)
  }
}
