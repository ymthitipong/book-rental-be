import { Publisher } from '@domain/entities/publisher.entity';
import type { IPublisherRepository } from '@domain/repositories/publisher.repository.interface';
import { PublisherCode } from '@domain/value-object/publisher-code';
import { PublisherName } from '@domain/value-object/publisher-name';
import { PublisherTypeormEntity } from '@infrastructure/config/typeorm/entities/publisher.entity';
import { PublisherMapper } from '@infrastructure/persistence/mapper/publisher.mapper';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';

@Injectable()
export class PublisherRepository implements IPublisherRepository {
  constructor(
    @InjectRepository(PublisherTypeormEntity)
    private readonly publisherTypeormRepository: Repository<PublisherTypeormEntity>,
  ) {}

  async findByCode(code: PublisherCode): Promise<Publisher | null> {
    const publisherPersistenceData =
    await this.publisherTypeormRepository.findOne({ where: { code: code.value } });
    
    if (!publisherPersistenceData) {
      return null;
    }
    
    return PublisherMapper.toDomain(publisherPersistenceData);
  }
  
  async findAllByPartialName(name: PublisherName): Promise<Publisher[]> {
    const publisherPersistenceData = await this.publisherTypeormRepository.find({
      where: { name: Like(`%${name.value}%`) },
    });
    
    return publisherPersistenceData.map(PublisherMapper.toDomain);
  }
  
  async save(publisher: Publisher): Promise<Publisher> {
    const savedPersistenceData = await this.publisherTypeormRepository.save(
      {
        code: publisher.code.value,
        name: publisher.name.value,
      },
    );

    return PublisherMapper.toDomain(savedPersistenceData);
  }
}
