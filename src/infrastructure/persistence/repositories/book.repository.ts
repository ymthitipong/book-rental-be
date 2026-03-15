import { Book } from "@domain/entities/book.entity";
import { IBookRepository } from "@domain/repositories/book.repository.interface";
import { RepositoryOrderSelectionType } from "@domain/repositories/repository.interface";
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

  async findAll(data: {
    title?: BookTitle;
    authorName?: AuthorName;
    category?: string;
  }, options: {
    limit?: number;
    order?: {
      [key in 'title']: RepositoryOrderSelectionType;
    };
  }): Promise<Book[]> {

    const booksPersistenceData = await this.bookTypeormRepository.find({
      where: {
        title: data.title 
          ? Like(`%${data.title.value}%`)
          : undefined,
        authors: data.authorName 
          ? { name: Like(`%${data.authorName.value}%`) } 
          : undefined,
        category: data.category,
      },
      relations: {
        publisher: true,
        copies: true,
        authors: true,
      },
      take: options.limit || 100,
      order: options.order || undefined,
    });

    return booksPersistenceData.map(BookMapper.toDomain);
  }

  async findById(id: number): Promise<Book | null> {
    const bookPersistenceData = await this.bookTypeormRepository.findOne({
      where: { id },
      relations: {
        publisher: true,
        copies: true,
        authors: true,
      },
    });
    
    if (!bookPersistenceData) {
      return null;
    }
    
    return BookMapper.toDomain(bookPersistenceData);
  }

  async findByCode(code: BookCode): Promise<Book | null> {
    const bookPersistenceData = await this.bookTypeormRepository.findOne({
      where: { code: code.value },
      relations: {
        publisher: true,
        copies: true,
        authors: true,
      },
    });
    
    if (!bookPersistenceData) {
      return null;
    }
    
    return BookMapper.toDomain(bookPersistenceData);
  }

  async save(book: Book): Promise<Book> {
    const { id } = await this.bookTypeormRepository.save({
      title: book.title.value,
      code: book.code.value,
      category: book.category.code,
      description: book.description,
      publicationDate: book.publicationDate,
      publisher: book.publisher?.persistenceId
        ? { id: book.publisher.persistenceId } 
        : null,
      authors: book.authors
        .filter(
          (author): author is typeof author & { persistenceId: number } => 
            author.persistenceId !== null
        )
        .map(
          (author) => ({
            id: author.persistenceId
          })
        )
    });

    // Todo: need adjustment for 2 db traffic -> only 1
    const savedPersistenceData = await this.bookTypeormRepository.findOne({
      where: { id },
      relations: {
        publisher: true, 
        copies: true,
        authors: true,
      },
    });

    if (!savedPersistenceData) {
      throw new Error('Failed to create book');
    }

    return BookMapper.toDomain(savedPersistenceData);
  }
}
