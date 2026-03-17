import { BookCopy } from "@domain/entities/book-copy.entity";
import { IBookCopyRepository } from "@domain/repositories/book-copy.repository.interface";
import { BookCopyTypeormEntity } from "@infrastructure/config/typeorm/entities/book-copy.entity";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { BookCopyMapper } from "../mapper/book-copy.mapper";

@Injectable()
export class BookCopyRepository implements IBookCopyRepository {
  constructor(
    @InjectRepository(BookCopyTypeormEntity)
    private readonly bookCopyTypeormRepository: Repository<BookCopyTypeormEntity>,
  ) {}

  async findAllByBookId(bookId: number): Promise<BookCopy[]> {
    const persistenceData = await this.bookCopyTypeormRepository.find({
      relations: { book: true },
      where: { book: { id: bookId } },
    });

    return persistenceData.map((data) => BookCopyMapper.toDomain(data));
  }

  async findByBookIdAndNo(bookId: number, no: number): Promise<BookCopy | null> {
    const persistenceData = await this.bookCopyTypeormRepository.findOne({
      relations: { book: true },
      where: { book: { id: bookId }, no },
    });

    if (!persistenceData) {
      return null;
    }

    return BookCopyMapper.toDomain(persistenceData);
  }

  async findById(id: number): Promise<BookCopy | null> {
    const persistenceData = await this.bookCopyTypeormRepository.findOne({
      relations: { book: true },
      where: { id },
    });

    if (!persistenceData) {
      return null;
    }

    return BookCopyMapper.toDomain(persistenceData);
  }

  async saveAllWithBookId(
    bookCopies: BookCopy[],
    bookId: number,
  ): Promise<void> {
    await this.bookCopyTypeormRepository.save(
      bookCopies.map((copy) => ({
        book: { id: bookId },
        no: copy.number,
        status: copy.status.value,
      })),
    );
  }
}
