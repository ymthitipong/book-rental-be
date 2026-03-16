import { IEnvironmentConfig } from "@domain/environment.interface";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class EnvironmentConfigService implements IEnvironmentConfig {
  constructor(private configService: ConfigService) {}

  getDatabaseConfig() {
    return {
      host: this.configService.get<string>("DB_HOST") || "localhost",
      name: this.configService.get<string>("DB_NAME") || "book_rental_db",
      password: this.configService.get<string>("DB_PASSWORD") || "password",
      port: this.configService.get<number>("DB_PORT") || 5003,
      schema: this.configService.get<string>("DATABASE_SCHEMA") || "public",
      synchronize: this.configService.get<boolean>("DATABASE_SYNCHRONIZE") || false,
      username: this.configService.get<string>("DB_USERNAME") || "user",
    };
  }
}
