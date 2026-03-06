import { IsNumber, IsString, Max, Min } from 'class-validator';
import dayjs from 'dayjs';

export class CreateAuthorRequestBodyDto {
  @IsString()
  name!: string;

  @IsNumber()
  @Min(1)
  @Max(dayjs().year())
  yearOfBirth!: number;
}
