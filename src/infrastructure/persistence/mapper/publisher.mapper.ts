import { Publisher } from "../../../domain/entities/publisher.entity";
import { PublisherTypeormEntity } from "../../config/typeorm/entities/publisher.entity";

export class PublisherMapper {
  static toDomain(typeorm: PublisherTypeormEntity): Publisher {
    return Publisher.create({
      persistenceId: typeorm.id,
      name: typeorm.name,
      code: typeorm.code,
    });
  }

  static toPersistence(domain: Publisher): Omit<
    PublisherTypeormEntity,
    "id" | "createdAt" | "updatedAt" | "deletedAt"
  > & {
    id: number | null;
  } {
    return {
      id: domain.persistenceId,
      code: domain.code,
      name: domain.name,
    };
  }
}
