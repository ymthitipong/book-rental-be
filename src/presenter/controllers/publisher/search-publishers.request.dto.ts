import { Transform } from "class-transformer";
import {
 IsIn, IsInt, IsOptional, IsString, Min 
} from "class-validator";

export class SearchPublishersByPartialNameRequestQueryDto {
  @IsString()
  name!: string;

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
  @IsIn(["name_asc", "name_desc"])
  order!: "name_asc" | "name_desc" | undefined;
}
