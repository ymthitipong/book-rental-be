import { Expose, Transform } from "class-transformer";
import {
 IsIn, IsInt, IsOptional, IsString, Min 
} from "class-validator";

export class SearchBooksQueryDto {
  @IsOptional()
  @IsString()
  title!: string | undefined;

  @Expose({ name: "author_name" })
  @IsOptional()
  @IsString()
  authorName!: string | undefined;

  @IsOptional()
  @Transform(({ value }) => {
    const limit = Number(value);
    // if value is non-zero number, return it; otherwise return undefined
    return limit || undefined;
  })
  @IsInt()
  @Min(1)
  limit!: number | undefined;

  @IsOptional()
  @IsString()
  @IsIn(["title_asc", "title_desc"])
  order!: "title_asc" | "title_desc" | undefined;
}
