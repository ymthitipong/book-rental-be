import { IsString } from 'class-validator';

export class SearchAuthorsByPartialNameRequestQueryDto {
  @IsString()
  name!: string;
}
