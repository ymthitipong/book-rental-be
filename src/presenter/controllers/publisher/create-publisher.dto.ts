import { IsString } from 'class-validator';

export class CreatePublisherRequestBodyDto {
  @IsString()
  name!: string;
}
