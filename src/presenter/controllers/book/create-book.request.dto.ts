import { BookCategoryEnum } from "@domain/constant/book-category.constant";
import { AuthorCode } from "@domain/value-object/author-code";
import { PublisherCode } from "@domain/value-object/publisher-code";
import { Expose } from "class-transformer";
import {
  IsDateString,
  IsEnum,
  IsOptional,
  IsString,
  Matches,
} from "class-validator";

export class CreateBookRequestBodyDto {
  @Expose({ name: "author_codes" })
  @Matches(AuthorCode.pattern, { each: true })
  authorCodes!: string[];

  @IsString()
  title!: string;

  @Expose({ name: "publisher_code" })
  @IsOptional()
  @Matches(PublisherCode.pattern)
  publisherCode!: string | undefined;

  @IsEnum(BookCategoryEnum)
  category!: BookCategoryEnum;

  @IsOptional()
  @IsString()
  description!: string | undefined;

  @Expose({ name: "publication_date" })
  @IsOptional()
  @IsDateString()
  publicationDate!: string | undefined;
}
