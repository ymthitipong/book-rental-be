import { BookCode } from "@domain/value-object/book-code";
import { Expose } from "class-transformer";
import {
 IsInt, Matches, Min 
} from "class-validator";

export class CreateCopiesByBookPararmsDto {
  @Matches(BookCode.pattern)
  code!: string;
}

export class CreateCopiesByBookRequestBodyDto {
  @Expose({ name: "new_copy_count" })
  @IsInt()
  @Min(1)
  newCopyCount!: number;
}
