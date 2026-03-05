import {
  Column, Entity
} from "typeorm";
import { BaseEntity } from "./base";

@Entity("publisher")
export abstract class PublisherTypeormEntity extends BaseEntity {
  @Column("text")
  code!: string;

  @Column("text")
  name!: string;
}
