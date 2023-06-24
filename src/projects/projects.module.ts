import { Module } from '@nestjs/common';
import { ProjectsController } from './controllers/projects.controller';
import { ProjectsService } from './services/projects.service';
import { ProjectsEntity } from './entities/projects.entity';
import { TypeOrmModule } from '@nestjs/typeorm';


@Module({

  imports: [
    TypeOrmModule.forFeature([ProjectsEntity])
  ],
  controllers: [ProjectsController],
  providers: [ProjectsService]
})
export class ProjectsModule {}
