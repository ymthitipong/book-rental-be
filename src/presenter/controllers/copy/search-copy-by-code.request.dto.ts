import { IsString } from "class-validator";

export class SearchCopyByCodeParamsDto {
  @IsString()
  code!: string;
}
