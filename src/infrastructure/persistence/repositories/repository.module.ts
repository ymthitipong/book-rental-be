import { CounterTypeormEntity } from '@infrastructure/config/typeorm/entities/counter.entity';
import { PublisherTypeormEntity } from '@infrastructure/config/typeorm/entities/publisher.entity';
import { TypeOrmConfigModule } from '@infrastructure/config/typeorm/typeorm.module';
import { CounterRepository } from '@infrastructure/persistence/repositories/counter.repository';
import { PublisherRepository } from '@infrastructure/persistence/repositories/publisher.repository';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmConfigModule,
    TypeOrmModule.forFeature([PublisherTypeormEntity, CounterTypeormEntity]),
  ],
  providers: [PublisherRepository, CounterRepository],
  exports: [PublisherRepository, CounterRepository],
})
export class RepositoryModule {}
