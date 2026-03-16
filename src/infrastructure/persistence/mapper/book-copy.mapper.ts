import { BookCopyStatusEnum } from "@domain/constant/book-copy-status.constant";
import { BookCopy } from "@domain/entities/book-copy.entity";
import { BookCode } from "@domain/value-object/book-code";
import { BookCopyStatus } from "@domain/value-object/book-copy-status.vo";
import { BookCopyTypeormEntity } from "@infrastructure/config/typeorm/entities/book-copy.entity";
import { parseEnum } from "src/common/utils/parse-enum.util";

export class BookCopyMapper {
  static toDomain(typeorm: BookCopyTypeormEntity): BookCopy {
    return BookCopy.create({
      bookCode: BookCode.create(typeorm.book.code),
      no: typeorm.no,
      status: BookCopyStatus.create(
        parseEnum(BookCopyStatusEnum, typeorm.status),
      ),
    });
  }
}
