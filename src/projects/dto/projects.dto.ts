import {  ROLES } from 'src/constants/roles';
import {  IsNotEmpty,  IsOptional, IsString } from 'class-validator';

export class ProjectDTO {

  @IsNotEmpty()
  @IsString()
  name: string;

  
  @IsNotEmpty()
  @IsString()
  descriptions: string;

}

export class ProjectUpdateDTO {

  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  descriptions: string;

}