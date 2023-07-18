import { ConfigModule, ConfigService } from "@nestjs/config";
import { DataSource, DataSourceOptions } from "typeorm";
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

const path = require('path');
const currentPath = __dirname
const migrationsPath = path.resolve(currentPath,'..',  '..', 'migrations/*{.ts,.js}');
console.log(migrationsPath)

ConfigModule.forRoot({
    envFilePath: `.${process.env.NODE_ENV}.env`,
  });

const configService = new ConfigService();
console.log()
export const DataSourceConfig: DataSourceOptions = {
    type: 'postgres',
    host: configService.get('DB_HOST'),
    port: configService.get('DB_PORT'),
    username: configService.get('DB_USER'),
    password: configService.get('DB_PASSWORD'),
    database: configService.get('DB_NAME'),
    entities: [__dirname + '/../**/**/*.entity{.ts,.js}'],
    migrations: [migrationsPath],
    synchronize: false,
    migrationsRun: true,
    logging: false,
    namingStrategy: new SnakeNamingStrategy(),
}


export const AppDS = new DataSource(DataSourceConfig)