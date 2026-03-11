import { Author } from '../entities/author.entity';

export interface IAuthorRepository {
  findByCode(code: string): Promise<Author | null>;
  save(author: Author): Promise<Author>;
}
