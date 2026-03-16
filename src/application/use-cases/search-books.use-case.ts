import { BookSummary, BookSummaryMapper } from "@application/summary/book.summary";
import type { ILogger } from "@domain/logger.interface";
import type { IBookRepository } from "@domain/repositories/book.repository.interface";
import { RepositoryOrderSelectionType } from "@domain/repositories/repository.interface";
import { AuthorName } from "@domain/value-object/author-name";
import { BookTitle } from "@domain/value-object/book-title";

interface ISearchBooksData {
  title?: string;
  authorName?: string;
}

interface ISearchBooksOptions {
  limit: number;
  order: string;
}

export class SearchBooksUsecase {
  private readonly loggerContext = "SearchBooksUsecaseExecute";

  constructor(
    private readonly bookRepository: IBookRepository,

    private readonly logger: ILogger,
  ) {}

  async execute(
    data: ISearchBooksData,
    options: ISearchBooksOptions,
  ): Promise<BookSummary[]> {
    this.logger.info(this.loggerContext, "start");

    const findAllProps = {
      title: data.title ? BookTitle.create(data.title) : undefined,
      authorName: data.authorName ? AuthorName.create(data.authorName) : undefined,
    };
    const findAllOptions = {
      limit: options.limit,
      order: toBookRepositoryOrder(options.order),
    }
    
    const books = await this.bookRepository.findAll(findAllProps, findAllOptions);
    
    this.logger.info(this.loggerContext, "end");
    return BookSummaryMapper.toListSummary(books);
  }
}

const toBookRepositoryOrder = (usecaseOrder: string): { ['title']: RepositoryOrderSelectionType } => {
  switch (usecaseOrder) {
    case 'title_desc':
      return { title: 'desc' };
    default:
      return { title: 'asc' };
  }
}
