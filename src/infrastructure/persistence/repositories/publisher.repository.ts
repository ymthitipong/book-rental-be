import { Publisher } from '@domain/entities/publisher.entity';
import type { IPublisherRepository } from '@domain/repositories/publisher.repository.interface';
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

  async findByCode(code: string): Promise<Publisher | null> {
    const publisherPersistenceData =
    await this.publisherTypeormRepository.findOne({ where: { code } });
    
    if (!publisherPersistenceData) {
      return null;
    }
    
    return PublisherMapper.toDomain(publisherPersistenceData);
  }
  
  async findAllByPartialName(name: string): Promise<Publisher[]> {
    const publisherPersistenceData = await this.publisherTypeormRepository.find({
      where: { name: Like(`%${name}%`) },
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
