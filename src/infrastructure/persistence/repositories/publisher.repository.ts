import { Publisher } from '@domain/entities/publisher.entity';
import type { IPublisherRepository } from '@domain/repositories/publisher.repository';
import { PublisherTypeormEntity } from '@infrastructure/config/typeorm/entities/publisher.entity';
import { PublisherMapper } from '@infrastructure/persistence/mapper/publisher.mapper';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PublisherRepository implements IPublisherRepository {
  constructor(
    @InjectRepository(PublisherTypeormEntity)
    private readonly publisherTypeormRepository: Repository<PublisherTypeormEntity>,
  ) {}

  async save(publisher: Publisher): Promise<Publisher> {
    const savedPersistenceData = await this.publisherTypeormRepository.save(
      {
        code: publisher.code,
        name: publisher.name,
      },
    );

    return PublisherMapper.toDomain(savedPersistenceData);
  }

  async findByName(name: string): Promise<Publisher | null> {
    const publisherPersistenceData =
      await this.publisherTypeormRepository.findOne({ where: { name } });

    if (!publisherPersistenceData) {
      return null;
    }

    return PublisherMapper.toDomain(publisherPersistenceData);
  }
}
