import {
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn
} from "typeorm";
import { AuthorTypeormEntity } from "./author.entity";
import { BookTypeormEntity } from "./book.entity";

@Entity("author_book_mapping")
export abstract class AuthorBookMappingTypeormEntity {
  @PrimaryGeneratedColumn({
    type: "integer",
  })
  id!: number;

  @ManyToOne(() => AuthorTypeormEntity)
  @JoinColumn({ name: "author_id" })
  author!: AuthorTypeormEntity;

  @ManyToOne(() => BookTypeormEntity)
  @JoinColumn({ name: "book_id" })
  book!: BookTypeormEntity;
}
