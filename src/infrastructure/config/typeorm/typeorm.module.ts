import { Module } from "@nestjs/common";
import {
  TypeOrmModule, TypeOrmModuleOptions
} from "@nestjs/typeorm";
import { EnvironmentConfigModule } from "../environment-config/environment-config.module";
import { EnvironmentConfigService } from "../environment-config/environment-config.service";

export const getTypeOrmModuleOptions = (
  config: EnvironmentConfigService,
): TypeOrmModuleOptions =>
  ({
    type: "postgres",
    host: config.getDatabaseConfig().host,
    port: config.getDatabaseConfig().port,
    username: config.getDatabaseConfig().username,
    password: config.getDatabaseConfig().password,
    database: config.getDatabaseConfig().name,
    entities: [__dirname + "/entities/*.entity{.ts,.js}"],
    synchronize: config.getDatabaseConfig().synchronize,
    schema: config.getDatabaseConfig().schema,
  }) as TypeOrmModuleOptions;

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [EnvironmentConfigModule],
      inject: [EnvironmentConfigService],
      useFactory: getTypeOrmModuleOptions,
    }),
  ],
})
export class TypeOrmConfigModule {}
