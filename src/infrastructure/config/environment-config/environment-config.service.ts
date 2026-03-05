import { IEnvironmentConfig } from "@domain/environment.interface";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class EnvironmentConfigService implements IEnvironmentConfig {
  constructor(private configService: ConfigService) {}

  getDatabaseConfig() {
    return {
      host: this.configService.get<string>("DB_HOST") || "localhost",
      port: this.configService.get<number>("DB_PORT") || 5003,
      username: this.configService.get<string>("DB_USERNAME") || "user",
      password: this.configService.get<string>("DB_PASSWORD") || "password",
      name: this.configService.get<string>("DB_NAME") || "book_rental_db",
      schema: this.configService.get<string>("DATABASE_SCHEMA") || "public",
      synchronize:
        this.configService.get<boolean>("DATABASE_SYNCHRONIZE") || false,
    };
  }
}
