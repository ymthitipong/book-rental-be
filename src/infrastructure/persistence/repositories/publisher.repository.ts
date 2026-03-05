import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Publisher } from '../../../domain/entities/publisher.entity';
import type { IPublisherRepository } from '../../../domain/repositories/publisher.repository';
import { PublisherTypeormEntity } from '../../config/typeorm/entities/publisher.entity';
import { PublisherMapper } from '../mapper/publisher.mapper';

@Injectable()
export class PublisherRepository implements IPublisherRepository {
  constructor(
    @InjectRepository(PublisherTypeormEntity)
    private readonly publisherTypeormRepository: Repository<PublisherTypeormEntity>,
  ) {}

  async save(publisher: Publisher): Promise<Publisher> {
    const publisherPersistenceData = await this.publisherTypeormRepository.save(
      {
        code: publisher.code,
        name: publisher.name,
      },
    );

    return PublisherMapper.toDomain(publisherPersistenceData);
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
