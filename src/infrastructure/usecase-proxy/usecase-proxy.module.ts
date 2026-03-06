import { CreateAuthorUseCase } from '@application/use-cases/create-author.use-case';
import { CreatePublisherUseCase } from '@application/use-cases/create-publisher.use-case';
import { ExceptionsModule } from '@infrastructure/exception/exceptions.module';
import { ExceptionsService } from '@infrastructure/exception/exceptions.service';
import { LoggerModule } from '@infrastructure/logger/logger.module';
import { LoggerService } from '@infrastructure/logger/logger.service';
import { AuthorRepository } from '@infrastructure/persistence/repositories/author.repository';
import { CounterRepository } from '@infrastructure/persistence/repositories/counter.repository';
import { PublisherRepository } from '@infrastructure/persistence/repositories/publisher.repository';
import { RepositoryModule } from '@infrastructure/persistence/repositories/repository.module';
import { DynamicModule, Module } from '@nestjs/common';

@Module({ imports: [ExceptionsModule, RepositoryModule, LoggerModule] })
export class UsecaseProxyModule {
  static CREATE_AUTHOR = 'CREATE_AUTHOR';
  static CREATE_PUBLISHER = 'CREATE_PUBLISHER';

  static register(): DynamicModule {
    return {
      module: UsecaseProxyModule,
      providers: [
        {
          inject: [
            CounterRepository,
            AuthorRepository,
            ExceptionsService,
            LoggerService,
          ],
          provide: UsecaseProxyModule.CREATE_AUTHOR,
          useFactory: (
            counterRepository: CounterRepository,
            authorRepository: AuthorRepository,
            exceptionsService: ExceptionsService,
            loggerService: LoggerService,
          ) =>
            new CreateAuthorUseCase(
              counterRepository,
              authorRepository,
              exceptionsService,
              loggerService,
            ),
        },
        {
          inject: [
            CounterRepository,
            PublisherRepository,
            ExceptionsService,
            LoggerService,
          ],
          provide: UsecaseProxyModule.CREATE_PUBLISHER,
          useFactory: (
            counterRepository: CounterRepository,
            publisherRepository: PublisherRepository,
            exceptionsService: ExceptionsService,
            loggerService: LoggerService,
          ) =>
            new CreatePublisherUseCase(
              counterRepository,
              publisherRepository,
              exceptionsService,
              loggerService,
            ),
        },
      ],
      exports: [
        UsecaseProxyModule.CREATE_AUTHOR,
        UsecaseProxyModule.CREATE_PUBLISHER,
      ],
    };
  }
}
