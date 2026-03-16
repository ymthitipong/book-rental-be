import { Publisher } from "@domain/entities/publisher.entity";
import { PublisherCode } from "@domain/value-object/publisher-code";
import { PublisherName } from "@domain/value-object/publisher-name";
import { RepositoryOrderSelectionType } from "./repository.interface";

export interface IPublisherRepository {
  findAll(
    props: {
      name?: PublisherName;
    },
    options: {
      limit?: number;
      order?: {
        [key in "name"]: RepositoryOrderSelectionType;
      };
    },
  ): Promise<Publisher[]>;
  findByCode(code: PublisherCode): Promise<Publisher | null>;
  save(publisher: Publisher): Promise<void>;
}
