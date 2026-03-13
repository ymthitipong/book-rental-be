import { BookCategoryEnum } from '@domain/constant/book-category.constant';
import { AuthorCode } from '@domain/value-object/author-code';
import { PublisherCode } from '@domain/value-object/publisher-code';
import { IsDateString, IsEnum, IsOptional, IsString, Matches } from 'class-validator';

export class CreatePublisherRequestBodyDto {
  @Matches(AuthorCode.pattern, { each: true })
  authorCodes!: string[];

  @IsString()
  title!: string;

  @IsOptional()
  @Matches(PublisherCode.pattern)
  publisherCode!: string | undefined;

  @IsEnum(BookCategoryEnum)
  category!: BookCategoryEnum;

  @IsOptional()
  @IsString()
  description!: string | undefined;

  @IsOptional()
  @IsDateString()
  publicationDate!: string | undefined;
}
