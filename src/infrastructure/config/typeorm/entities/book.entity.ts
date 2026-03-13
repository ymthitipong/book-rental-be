import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { AuthorTypeormEntity } from "./author.entity";
import { BaseEntity } from "./base";
import { BookCopyTypeormEntity } from "./book-copy.entity";
import { PublisherTypeormEntity } from "./publisher.entity";

@Entity("book")
export class BookTypeormEntity extends BaseEntity {
  @Column("text")
  title!: string;

  @Column("char", {
    length: "8",
  })
  code!: string;

  @Column("char", {
    length: "3",
  })
  category!: string;

  @Column("date", {
    name: "publication_date",
  })
  publicationDate!: string | null;

  @Column("text", {
    nullable: true,
  })
  description!: string | null;

  @ManyToMany(() => AuthorTypeormEntity)
  @JoinTable({
    name: "author_book_mapping",
    joinColumn: {
      name: "book_id",
      referencedColumnName: "id",
    },
    inverseJoinColumn: {
      name: "author_id",
      referencedColumnName: "id",
    },
  })
  authors!: AuthorTypeormEntity[];

  @ManyToOne(() => PublisherTypeormEntity)
  @JoinColumn({ name: "publisher_id" })
  publisher!: PublisherTypeormEntity | null;

  @OneToMany(() => BookCopyTypeormEntity, (copy) => copy.book)
  copies!: BookCopyTypeormEntity[];
} 
