import { Publisher } from "@domain/entities/publisher.entity";
import { PublisherCode } from "@domain/value-object/publisher-code";
import { PublisherName } from "@domain/value-object/publisher-name";
import { PublisherTypeormEntity } from "@infrastructure/config/typeorm/entities/publisher.entity";

export type PublisherPersistence = Omit<
  PublisherTypeormEntity,
  "id" | "createdAt" | "updatedAt" | "deletedAt"
> & {
  id: number | null;
};

export class PublisherMapper {
  static toDomain(typeorm: PublisherTypeormEntity): Publisher {
    return Publisher.create({
      code: PublisherCode.create(typeorm.code),
      name: PublisherName.create(typeorm.name),
      persistenceId: typeorm.id,
    });
  }
}
