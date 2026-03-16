import { BookCopyStatusEnum } from "@domain/constant/book-copy-status.constant";
import { BookCopy } from "@domain/entities/book-copy.entity";
import { BookCopyStatus } from "@domain/value-object/book-copy-status.vo";
import { BookCopyTypeormEntity } from "@infrastructure/config/typeorm/entities/book-copy.entity";
import { parseEnum } from "src/common/utils/parse-enum.util";
import { BookMapper } from "./book.mapper";

export class BookCopyMapper {
  static toDomain(typeorm: BookCopyTypeormEntity): BookCopy {
    return BookCopy.create({
      book: BookMapper.toDomain(typeorm.book),
      no: typeorm.no,
      status: BookCopyStatus.create(parseEnum(BookCopyStatusEnum, typeorm.status)),
    });
  }
}
