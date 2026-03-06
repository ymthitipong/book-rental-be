import { AuthorTypeormEntity } from '@infrastructure/config/typeorm/entities/author.entity';
import { Author } from '../../../domain/entities/author.entity';

export class AuthorMapper {
  static toDomain(typeorm: AuthorTypeormEntity): Author {
    return Author.create({
      code: typeorm.code,
      name: typeorm.name,
      yearOfBirth: typeorm.yearOfBirth,
      persistenceId: typeorm.id,
    });
  }

  static toPersistence(domain: Author): Omit<
    AuthorTypeormEntity,
    'id' | 'createdAt' | 'updatedAt' | 'deletedAt'
  > & {
    id: number | null;
  } {
    return {
      id: domain.persistenceId,
      code: domain.code,
      name: domain.name,
      yearOfBirth: domain.yearOfBirth,
    };
  }
}
