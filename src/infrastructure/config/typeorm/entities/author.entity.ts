import {
  Column,
  Entity
} from "typeorm";
import { BaseEntity } from "./base";

@Entity("author")
export class AuthorTypeormEntity extends BaseEntity {
  @Column("text")
  name!: string;

  @Column("text")
  code!: string;

  @Column("integer", {
    name: "year_of_birth",
  })
  yearOfBirth!: number;
}
