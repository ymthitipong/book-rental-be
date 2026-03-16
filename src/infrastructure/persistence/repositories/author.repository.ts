import { Author } from "@domain/entities/author.entity";
import type { IAuthorRepository } from "@domain/repositories/author.repository.interface";
import { RepositoryOrderSelectionType } from "@domain/repositories/repository.interface";
import { AuthorCode } from "@domain/value-object/author-code";
import { AuthorName } from "@domain/value-object/author-name";
import { AuthorTypeormEntity } from "@infrastructure/config/typeorm/entities/author.entity";
import { AuthorMapper } from "@infrastructure/persistence/mapper/author.mapper";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import {
  In, Like, Repository
} from "typeorm";

@Injectable()
export class AuthorRepository implements IAuthorRepository {
  constructor(
    @InjectRepository(AuthorTypeormEntity)
    private readonly authorTypeormRepository: Repository<AuthorTypeormEntity>,
  ) {}

  async findByCode(code: AuthorCode): Promise<Author | null> {
    const authorPersistenceData = await this.authorTypeormRepository.findOne({where: { code: code.value },});

    if (!authorPersistenceData) {
      return null;
    }

    return AuthorMapper.toDomain(authorPersistenceData);
  }

  async findAll(
    props: {
      name?: AuthorName;
    },
    options: {
      limit?: number;
      order?: {
        [key in "name"]: RepositoryOrderSelectionType;
      };
    },
  ): Promise<Author[]> {
    const authorPersistenceData = await this.authorTypeormRepository.find({
      order: options.order || undefined,
      take: options.limit || 100,
      where: {name: props.name ? Like(`%${props.name.value}%`) : undefined,},
    });

    return authorPersistenceData.map(AuthorMapper.toDomain);
  }

  async findByCodes(codes: AuthorCode[]): Promise<Author[]> {
    const authorPersistenceData = await this.authorTypeormRepository.find({where: { code: In(codes.map((code) => code.value)) },});

    return authorPersistenceData.map(AuthorMapper.toDomain);
  }

  async save(author: Author): Promise<void> {
    await this.authorTypeormRepository.save({
      code: author.code.value,
      name: author.name.value,
      yearOfBirth: author.yearOfBirth,
    });
  }
}
