import { Author } from '@domain/entities/author.entity';
import type { IAuthorRepository } from '@domain/repositories/author.repository.interface';
import { AuthorTypeormEntity } from '@infrastructure/config/typeorm/entities/author.entity';
import { AuthorMapper } from '@infrastructure/persistence/mapper/author.mapper';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AuthorRepository implements IAuthorRepository {
  constructor(
    @InjectRepository(AuthorTypeormEntity)
    private readonly authorTypeormRepository: Repository<AuthorTypeormEntity>,
  ) {}

  async findByCode(code: string): Promise<Author | null> {
    const authorPersistenceData =
      await this.authorTypeormRepository.findOne({
        where: { code },
      });

    if (!authorPersistenceData) {
      return null;
    }

    return AuthorMapper.toDomain(authorPersistenceData);
  }

  async save(author: Author): Promise<Author> {
    const savedAuthor = await this.authorTypeormRepository.save({
      code: author.code.value,
      name: author.name.value,
      yearOfBirth: author.yearOfBirth,
    });
    return AuthorMapper.toDomain(savedAuthor);
  }
}
