import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { EnvironmentConfigService } from "./environment-config.service";

@Module({
  exports: [EnvironmentConfigService],
  imports: [ConfigModule.forRoot({ envFilePath: ".env.dev" })],
  providers: [EnvironmentConfigService],
})
export class EnvironmentConfigModule {}
