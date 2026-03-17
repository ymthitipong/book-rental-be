import { Expose } from "class-transformer";
import {
 IsNumber, IsString, Max, Min 
} from "class-validator";
import dayjs from "dayjs";

export class CreateAuthorRequestBodyDto {
  @IsString()
  name!: string;

  @Expose({ name: "year_of_birth" })
  @IsNumber()
  @Min(1)
  @Max(dayjs().year())
  yearOfBirth!: number;
}
