import { IsString } from 'class-validator';

export class SearchPublishersByPartialNameRequestQueryDto {
  @IsString()
  name!: string;
}
