import { IsEnum, IsNotEmpty, IsOptional, IsString, isEnum } from "class-validator";
import { STATUS_TASK } from "src/constants/status-task";
import { ProjectDTO } from "src/projects/dto/projects.dto";

export class TasksDto {
    @IsString()
    @IsNotEmpty()
    taskName: string;
  
    @IsString()
    @IsNotEmpty()
    taskDescription: string;
  
    @IsNotEmpty()
    @IsEnum(STATUS_TASK)
    status: STATUS_TASK;

    @IsString()
    @IsNotEmpty()
    responsableName: string;

    @IsOptional()
    project: ProjectDTO;
  }
