import { IsString } from "class-validator";

export class UpdateStatusParamsDto {
  @IsString()
  code!: string;
}
