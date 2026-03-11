import { Book } from "@domain/entities/book.entity";
import { IBookRepository } from "@domain/repositories/book.repository.interface";
import { BookTypeormEntity } from "@infrastructure/config/typeorm/entities/book.entity";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { BookMapper } from "../mapper/book.mapper";

@Injectable()
export class BookRepository implements IBookRepository {
  constructor(
    @InjectRepository(BookTypeormEntity)
    private readonly bookTypeormRepository: Repository<BookTypeormEntity>,
  ) {}

  async findByCode(code: string): Promise<Book | null> {
    const bookPersistenceData = await this.bookTypeormRepository.findOne({
      where: { code },
      relations: {
        publisher: true,
        copies: true,
        authors: true,
      },
    });

    console.log('bookPersistenceData', bookPersistenceData);
    
    if (!bookPersistenceData) {
      return null;
    }
    
    return BookMapper.toDomain(bookPersistenceData);
  }

  async save(book: Book): Promise<Book> {
    // const savedPersistenceData = await this.bookTypeormRepository.create({

    // });

    throw new Error('Method not implemented.');
  }
}
