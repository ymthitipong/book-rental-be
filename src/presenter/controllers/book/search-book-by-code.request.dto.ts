import { BookCode } from "@domain/value-object/book-code";
import { Matches } from "class-validator";

export class SearchBookByCodePararmsDto {
  @Matches(BookCode.pattern)
  code!: string;
}
