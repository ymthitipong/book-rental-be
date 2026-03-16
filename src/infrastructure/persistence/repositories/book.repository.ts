import { Book } from "@domain/entities/book.entity";
import {
  IBookRepository,
  OrderOptions,
  RelationOptions,
  UpdateData,
} from "@domain/repositories/book.repository.interface";
import { AuthorName } from "@domain/value-object/author-name";
import { BookCode } from "@domain/value-object/book-code";
import { BookTitle } from "@domain/value-object/book-title";
import { BookTypeormEntity } from "@infrastructure/config/typeorm/entities/book.entity";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Like, Repository } from "typeorm";
import { BookMapper } from "../mapper/book.mapper";

@Injectable()
export class BookRepository implements IBookRepository {
  constructor(
    @InjectRepository(BookTypeormEntity)
    private readonly bookTypeormRepository: Repository<BookTypeormEntity>,
  ) {}

  async findAll(
    data: {
      title?: BookTitle;
      authorName?: AuthorName;
      category?: string;
    },
    options: {
      limit?: number;
      order?: OrderOptions;
      relations?: RelationOptions;
    },
  ): Promise<Book[]> {
    const booksPersistenceData = await this.bookTypeormRepository.find({
      order: options.order || undefined,
      relations: {
        authors: true,
        copies: options.relations?.copies || false,
        publisher: true,
      },
      take: options.limit || 100,
      where: {
        authors: data.authorName
        ? { name: Like(`%${data.authorName.value}%`) }
        : undefined,
        category: data.category,
        title: data.title ? Like(`%${data.title.value}%`) : undefined,
      },
    });

    return booksPersistenceData.map(BookMapper.toDomain);
  }

  async findById(
    id: number,
    options?: {
      relations?: RelationOptions;
    },
  ): Promise<Book | null> {
    const bookPersistenceData = await this.bookTypeormRepository.findOne({
      relations: {
        authors: true,
        copies: options?.relations?.copies || false,
        publisher: true,
      },
      where: { id },
    });

    if (!bookPersistenceData) {
      return null;
    }

    return BookMapper.toDomain(bookPersistenceData);
  }

  async findByCode(
    code: BookCode,
    options?: {
      relations?: RelationOptions;
    },
  ): Promise<Book | null> {
    const bookPersistenceData = await this.bookTypeormRepository.findOne({
      relations: {
        authors: true,
        copies: options?.relations?.copies || false,
        publisher: true,
      },
      where: { code: code.value },
    });

    if (!bookPersistenceData) {
      return null;
    }

    return BookMapper.toDomain(bookPersistenceData);
  }

  async save(
    book: Book,
    options?: {
      relations?: RelationOptions;
    },
  ): Promise<Book> {
    const { id } = await this.bookTypeormRepository.save({
      authors: book.authors
      .filter(
        (author): author is typeof author & { persistenceId: number } =>
          author.persistenceId !== null,
      )
      .map((author) => ({ id: author.persistenceId })),
      category: book.category.code,
      code: book.code.value,
      description: book.description,
      publicationDate: book.publicationDate,
      publisher: book.publisher?.persistenceId
      ? { id: book.publisher.persistenceId }
      : null,
      title: book.title.value,
    });

    // Todo: need adjustment for 2 db traffic -> only 1
    const savedPersistenceData = await this.bookTypeormRepository.findOne({
      relations: {
        authors: true,
        copies: options?.relations?.copies || false,
        publisher: true,
      },
      where: { id },
    });

    if (!savedPersistenceData) {
      throw new Error("Failed to create book");
    }

    return BookMapper.toDomain(savedPersistenceData);
  }

  async updateById(id: number, updateData: UpdateData): Promise<void> {
    const updatedPersistenceData = await this.bookTypeormRepository.update(id, {lastCopyNo: updateData.lastCopyNo,});

    if (!updatedPersistenceData) {
      throw new Error("Failed to update book");
    }
  }
}
