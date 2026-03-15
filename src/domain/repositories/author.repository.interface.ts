import { Author } from '@domain/entities/author.entity';
import { AuthorCode } from '@domain/value-object/author-code';
import { AuthorName } from '@domain/value-object/author-name';
import { RepositoryOrderSelectionType } from './repository.interface';

export interface IAuthorRepository {
  findAll(
    props: {
      name?: AuthorName;
    },
    options: {
      limit?: number;
      order?: {
        [key in 'name']: RepositoryOrderSelectionType;
      };
    },
  ): Promise<Author[]>;
  findByCode(code: AuthorCode): Promise<Author | null>;
  findByCodes(codes: AuthorCode[]): Promise<Author[]>;
  save(author: Author): Promise<Author>;
}
