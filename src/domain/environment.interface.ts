export interface IEnvironmentConfig {
  getDatabaseConfig(): {
    host: string;
    port: number;
    username: string;
    password: string;
    name: string;
    schema: string;
    synchronize: boolean;
  };
}
