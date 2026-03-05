import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EnvironmentConfigModule } from './infrastructure/config/environment-config/environment-config.module';
import { ExceptionsModule } from './infrastructure/exception/exceptions.module';
import { LoggerModule } from './infrastructure/logger/logger.module';
import { RepositoryModule } from './infrastructure/persistence/repositories/repository.module';
import { UsecaseProxyModule } from './infrastructure/usecase-proxy/usecase-proxy.module';
import { ControllerModule } from './presenter/controllers/controller.module';

@Module({
  controllers: [],
  providers: [],
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env.dev',
      isGlobal: true,
    }),
    EnvironmentConfigModule,
    LoggerModule,
    TypeOrmModule,
    UsecaseProxyModule.register(),
    ControllerModule,
    ExceptionsModule,
    RepositoryModule,
  ],
})
export class AppModule {}
