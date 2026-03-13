import { Author } from '@domain/entities/author.entity';
import { AuthorCode } from '@domain/value-object/author-code';
import { AuthorName } from '@domain/value-object/author-name';

export interface IAuthorRepository {
  findAllByPartialName(name: AuthorName): Promise<Author[]>;
  findByCode(code: AuthorCode): Promise<Author | null>;
  findByCodes(codes: AuthorCode[]): Promise<Author[]>;
  save(author: Author): Promise<Author>;
}
