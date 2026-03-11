import { AuthorCode } from '@domain/value-object/author-code';
import { Matches } from 'class-validator';

export class SearchAuthorByCodeRequestParamDto {
  @Matches(AuthorCode.pattern, {
    message: 'Invalid code format',
  })
  code!: string;
}
