import { Publisher } from "@domain/entities/publisher.entity";
import type { IPublisherRepository } from "@domain/repositories/publisher.repository.interface";
import { RepositoryOrderSelectionType } from "@domain/repositories/repository.interface";
import { PublisherCode } from "@domain/value-object/publisher-code";
import { PublisherName } from "@domain/value-object/publisher-name";
import { PublisherTypeormEntity } from "@infrastructure/config/typeorm/entities/publisher.entity";
import { PublisherMapper } from "@infrastructure/persistence/mapper/publisher.mapper";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Like, Repository } from "typeorm";

@Injectable()
export class PublisherRepository implements IPublisherRepository {
  constructor(
    @InjectRepository(PublisherTypeormEntity)
    private readonly publisherTypeormRepository: Repository<PublisherTypeormEntity>,
  ) {}

  async findByCode(code: PublisherCode): Promise<Publisher | null> {
    const publisherPersistenceData =
      await this.publisherTypeormRepository.findOne({where: { code: code.value },});

    if (!publisherPersistenceData) {
      return null;
    }

    return PublisherMapper.toDomain(publisherPersistenceData);
  }

  async findAll(
    props: {
      name?: PublisherName;
    },
    options: {
      limit?: number;
      order?: {
        [key in "name"]: RepositoryOrderSelectionType;
      };
    },
  ): Promise<Publisher[]> {
    const publisherPersistenceData = await this.publisherTypeormRepository.find(
      {
        order: options.order || undefined,
        take: options.limit || 100,
        where: { name: props.name ? Like(`%${props.name.value}%`) : undefined },
      },
    );

    return publisherPersistenceData.map(PublisherMapper.toDomain);
  }

  async save(publisher: Publisher): Promise<void> {
    await this.publisherTypeormRepository.save({
      code: publisher.code.value,
      name: publisher.name.value,
    });
  }
}
