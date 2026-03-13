import { BookCategoryEnum } from "@domain/constant/book-category.constant";
import { Book } from "@domain/entities/book.entity";
import { IAuthorRepository } from "@domain/repositories/author.repository.interface";
import { IBookRepository } from "@domain/repositories/book.repository.interface";
import { ICounterRepository } from "@domain/repositories/counter.repository.interface";
import { IPublisherRepository } from "@domain/repositories/publisher.repository.interface";
import { AuthorCode } from "@domain/value-object/author-code";
import { BookCategory } from "@domain/value-object/book-category";
import { BookCode } from "@domain/value-object/book-code";
import { BookTitle } from "@domain/value-object/book-title";
import { PublisherCode } from "@domain/value-object/publisher-code";

export class CreateBookUseCase {
  private readonly loggerContext = "CreateBookUseCaseExecute";

  constructor(
    private readonly authorRepository: IAuthorRepository,
    private readonly bookRepository: IBookRepository,
    private readonly counterRepository: ICounterRepository,
    private readonly publisherRepository: IPublisherRepository,
  ) {}

  async execute(data: {
    authorCodes: string[];
    category: BookCategoryEnum;
    description?: string;
    publisherCode?: string;
    publicationDate?: string;
    title: string;
  }): Promise<Book> {
    
    const publisher = data.publisherCode 
      ? await this.publisherRepository.findByCode(PublisherCode.create(data.publisherCode)) 
      : null;

    const authors = data.authorCodes.length > 0 
      ? await this.authorRepository.findByCodes(data.authorCodes.map((code) => AuthorCode.create(code))) 
      : [];

    const counter = await this.counterRepository.getBookCounterNumber();
    if (counter === null) {
      throw new Error("Failed to get book counter number");
    }

    const book = Book.create({
      authors,
      category: BookCategory.create(data.category),
      code: BookCode.create(counter),
      description: data.description,
      publisher,
      publicationDate: data.publicationDate,
      title: BookTitle.create(data.title),
    });

    const savedBook = await this.bookRepository.save(book);
    await this.counterRepository.updateBookCounterNumber(counter + 1);

    return savedBook;
  }
}

