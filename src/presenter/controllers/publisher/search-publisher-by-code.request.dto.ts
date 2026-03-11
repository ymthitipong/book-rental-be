import { PublisherCode } from '@domain/value-object/publisher-code';
import { Matches } from 'class-validator';

export class SearchAuthorByCodeRequestParamDto {
  @Matches(PublisherCode.pattern, {
    message: 'Invalid code format',
  })
  code!: string;
}
