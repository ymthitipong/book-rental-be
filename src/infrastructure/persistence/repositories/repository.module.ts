import { AuthorBookMappingTypeormEntity } from '@infrastructure/config/typeorm/entities/author-book-mapping.entity';
import { AuthorTypeormEntity } from '@infrastructure/config/typeorm/entities/author.entity';
import { BookCopyTypeormEntity } from '@infrastructure/config/typeorm/entities/book-copy.entity';
import { BookTypeormEntity } from '@infrastructure/config/typeorm/entities/book.entity';
import { CounterTypeormEntity } from '@infrastructure/config/typeorm/entities/counter.entity';
import { PublisherTypeormEntity } from '@infrastructure/config/typeorm/entities/publisher.entity';
import { TypeOrmConfigModule } from '@infrastructure/config/typeorm/typeorm.module';
import { AuthorRepository } from '@infrastructure/persistence/repositories/author.repository';
import { BookRepository } from '@infrastructure/persistence/repositories/book.repository';
import { CounterRepository } from '@infrastructure/persistence/repositories/counter.repository';
import { PublisherRepository } from '@infrastructure/persistence/repositories/publisher.repository';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmConfigModule,
    TypeOrmModule.forFeature([
      PublisherTypeormEntity,
      CounterTypeormEntity,
      AuthorTypeormEntity,
      BookTypeormEntity,
      BookCopyTypeormEntity,
      AuthorBookMappingTypeormEntity,
    ]),
  ],
  providers: [
    PublisherRepository,
    CounterRepository,
    AuthorRepository,
    BookRepository,
  ],
  exports: [
    PublisherRepository,
    CounterRepository,
    AuthorRepository,
    BookRepository,
  ],
})
export class RepositoryModule {}
