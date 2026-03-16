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
  @Column("text", { name: "available_copy_count" })
  availableCopyCount!: number;

  @ManyToMany(() => AuthorTypeormEntity)
  @JoinTable({
    inverseJoinColumn: {
      name: "author_id",
      referencedColumnName: "id",
    },
    joinColumn: {
      name: "book_id",
      referencedColumnName: "id",
    },
    name: "author_book_mapping",
  })
  authors!: AuthorTypeormEntity[];

  @Column("char", { length: "3" })
  category!: string;

  @Column("char", { length: "8" })
  code!: string;

  @OneToMany(() => BookCopyTypeormEntity, (copy) => copy.book)
  copies!: BookCopyTypeormEntity[];

  @Column("text", { nullable: true })
  description!: string | null;

  @Column("integer", {
    name: "last_copy_no",
    nullable: true,
  })
  lastCopyNo!: number | null;

  @Column("date", {
    name: "publication_date",
    nullable: true,
  })
  publicationDate!: string | null;

  @ManyToOne(() => PublisherTypeormEntity)
  @JoinColumn({ name: "publisher_id" })
  publisher!: PublisherTypeormEntity | null;

  @Column("text")
  title!: string;

  @Column("text", { name: "total_copy_count" })
  totalCopyCount!: number;
}
