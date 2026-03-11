import { CreateAuthorUseCase } from '@application/use-cases/create-author.use-case';
import { CreateBookUseCase } from '@application/use-cases/create-book.use-case';
import { CreatePublisherUseCase } from '@application/use-cases/create-publisher.use-case';
import { SearchAuthorByCodeUseCase } from '@application/use-cases/search-author-by-code.use-case';
import { SearchPublisherByCodeUseCase } from '@application/use-cases/search-publisher-by-code.use-case';
import { SearchPublishersByPartialNameUseCase } from '@application/use-cases/search-publishers-by-partial-name.use-case';
import { ExceptionsModule } from '@infrastructure/exception/exceptions.module';
import { ExceptionsService } from '@infrastructure/exception/exceptions.service';
import { LoggerModule } from '@infrastructure/logger/logger.module';
import { LoggerService } from '@infrastructure/logger/logger.service';
import { AuthorRepository } from '@infrastructure/persistence/repositories/author.repository';
import { BookRepository } from '@infrastructure/persistence/repositories/book.repository';
import { CounterRepository } from '@infrastructure/persistence/repositories/counter.repository';
import { PublisherRepository } from '@infrastructure/persistence/repositories/publisher.repository';
import { RepositoryModule } from '@infrastructure/persistence/repositories/repository.module';
import { DynamicModule, Module } from '@nestjs/common';

@Module({ imports: [ExceptionsModule, RepositoryModule, LoggerModule] })
export class UsecaseProxyModule {
  static CREATE_AUTHOR = 'CREATE_AUTHOR';
  static CREATE_PUBLISHER = 'CREATE_PUBLISHER';
  static CREATE_BOOK = 'CREATE_BOOK';
  static SEARCH_AUTHOR_BY_CODE = 'SEARCH_AUTHOR_BY_CODE';
  static SEARCH_PUBLISHER_BY_CODE = 'SEARCH_PUBLISHER_BY_CODE';
  static SEARCH_PUBLISHERS_BY_PARTIAL_NAME = 'SEARCH_PUBLISHERS_BY_PARTIAL_NAME';

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
        {
          inject: [
            BookRepository,
          ],
          provide: UsecaseProxyModule.CREATE_BOOK,
          useFactory: (
            bookRepository: BookRepository,
          ) =>
            new CreateBookUseCase(
              bookRepository,
            ),
        },
        {
          inject: [
            AuthorRepository,
            ExceptionsService,
            LoggerService,
          ],
          provide: UsecaseProxyModule.SEARCH_AUTHOR_BY_CODE,
          useFactory: (
            authorRepository: AuthorRepository,
            exceptionsService: ExceptionsService,
            loggerService: LoggerService,
          ) =>
            new SearchAuthorByCodeUseCase(
              authorRepository,
              exceptionsService,
              loggerService,
            ),
          },
          {
          inject: [
            PublisherRepository,
            ExceptionsService,
            LoggerService,
          ],
          provide: UsecaseProxyModule.SEARCH_PUBLISHER_BY_CODE,
          useFactory: (
            publisherRepository: PublisherRepository,
            exceptionsService: ExceptionsService,
            loggerService: LoggerService,
          ) =>
            new SearchPublisherByCodeUseCase(
              publisherRepository,
              exceptionsService,
              loggerService,
            ),
          },
          {
          inject: [
            PublisherRepository,
            ExceptionsService,
            LoggerService,
          ],
          provide: UsecaseProxyModule.SEARCH_PUBLISHERS_BY_PARTIAL_NAME,
          useFactory: (
            publisherRepository: PublisherRepository,
            exceptionsService: ExceptionsService,
            loggerService: LoggerService,
          ) =>
            new SearchPublishersByPartialNameUseCase(
              publisherRepository,
              exceptionsService,
              loggerService,
            ),
          },
      ],
      exports: [
        UsecaseProxyModule.CREATE_AUTHOR,
        UsecaseProxyModule.CREATE_PUBLISHER,
        UsecaseProxyModule.CREATE_BOOK,
        UsecaseProxyModule.SEARCH_AUTHOR_BY_CODE,
        UsecaseProxyModule.SEARCH_PUBLISHER_BY_CODE,
        UsecaseProxyModule.SEARCH_PUBLISHERS_BY_PARTIAL_NAME,
      ],
    };
  }
}
