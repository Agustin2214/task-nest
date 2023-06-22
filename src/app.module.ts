import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSourceConfig } from './config/data.source';
import { ProjectsModule } from './projects/projects.module';
import { ProjectsController } from './–flat/projects/controllers/projects/projects.controller';

@Module({
  imports: [

    ConfigModule.forRoot({
      envFilePath:`.${process.env.NODE_ENV}.env`,
      isGlobal: true
    }),
    TypeOrmModule.forRoot({...DataSourceConfig}),

    UsersModule,

    ProjectsModule
  
  ],
  controllers: [ProjectsController],
 
})
export class AppModule {}
