import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne
} from "typeorm";
import { BaseEntity } from "./base";
import { BookTypeormEntity } from "./book.entity";

@Entity("book_copy")
export class BookCopyTypeormEntity extends BaseEntity {
  @Column("integer")
  no!: number;

  @Column("text")
  status!: string;

  @ManyToOne(() => BookTypeormEntity, (book) => book.copies)
  @JoinColumn({ name: "book_id" })
  book!: BookTypeormEntity;
} 
