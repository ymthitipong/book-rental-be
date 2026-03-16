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

  async findById(
    id: number,
    options?: {
      relations: {
        book: boolean;
      };
    }
  ): Promise<BookCopy | null> {
    const persistenceData = await this.bookCopyTypeormRepository.findOne({
      where: { id },
      relations: options?.relations || undefined,
    });
    
    if (!persistenceData) {
      return null;
    }
    
    return BookCopyMapper.toDomain(persistenceData);
  }
  
  async saveAll(bookCopies: BookCopy[]): Promise<BookCopy[]> {
    const savedPersistenceData = await this.bookCopyTypeormRepository.save(
      bookCopies.map((copy) => ({
        no: copy.number,
        status: copy.status.value,
        book: {
          code: copy.bookCode.value,
        }
      }))
    );
    
    return savedPersistenceData.map((copy) => BookCopyMapper.toDomain(copy));
  }

}
