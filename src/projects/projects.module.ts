import { Module } from '@nestjs/common';
import { ProjectsController } from './controllers/projects.controller';
import { ProjectsService } from './services/projects.service';
import { ProjectsEntity } from './entities/projects.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'src/users/users.module';
import { UsersProjectsEntity } from 'src/users/entities/usersProjects.entity';
import { UsersService } from 'src/users/services/users.service';



@Module({
imports: [
    TypeOrmModule.forFeature([ProjectsEntity, UsersProjectsEntity]), UsersModule
  ],
  controllers: [ProjectsController],
  providers: [ProjectsService,UsersService],
  exports: [ProjectsService]
})
export class ProjectsModule {}
