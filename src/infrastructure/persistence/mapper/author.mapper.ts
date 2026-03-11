import { Author } from '@domain/entities/author.entity';
import { AuthorCode } from '@domain/value-object/author-code';
import { AuthorName } from '@domain/value-object/author-name';
import { AuthorTypeormEntity } from '@infrastructure/config/typeorm/entities/author.entity';

export type AuthorPersistence = Omit<
  AuthorTypeormEntity,
  'id' | 'createdAt' | 'updatedAt' | 'deletedAt'
> & {
  id: number | null;
};

export class AuthorMapper {
  static toDomain(typeorm: AuthorTypeormEntity): Author {
    return Author.create({
      code: AuthorCode.create(typeorm.code),
      name: AuthorName.create(typeorm.name),
      yearOfBirth: typeorm.yearOfBirth,
      persistenceId: typeorm.id,
    });
  }

  static toPersistence(author: Author): AuthorPersistence {
    return {
      id: author.persistenceId ?? null,
      code: author.code.value,
      name: author.name.value,
      yearOfBirth: author.yearOfBirth,
    };
  }
}
