import { SearchBooksUsecase } from '@application/use-cases/search-books.use-case';
import { Book } from '@domain/entities/book.entity';
import { UsecaseProxyModule } from '@infrastructure/usecase-proxy/usecase-proxy.module';
import { Controller, Get, Inject, Query } from '@nestjs/common';
import { IBookResponse, toBookResponse } from '@presenter/responses/book.response.dto';
import { IListResponse, toListResponse } from '@presenter/responses/list.response.dto';
import { SearchBooksQueryDto } from './search-books.request.dto';

@Controller('books')
export class BooksController {
  constructor(
    @Inject(UsecaseProxyModule.SEARCH_BOOKS)
    private readonly searchBooksUseCase: SearchBooksUsecase,
  ) {}

  private toResponse(
    books: Book[],
    options: {
      limit: number,
      order: 'title_asc' | 'title_desc'
    }
  ): IListResponse<IBookResponse> {
    return toListResponse<IBookResponse>(
      books.map((book) => toBookResponse(book)),
      {
        limit: options.limit,
        order: options.order,
      },
    );
  }

  @Get('')
  async searchByCode(@Query() query: SearchBooksQueryDto) {
    console.log('query', query);
    const limitDefault = 100;
    const orderDefault = 'title_asc';

    if (!query.title && !query.authorName) {
      return this.toResponse([], { limit: limitDefault, order: orderDefault });
    }

    const searchBooksData = {
      title: query.title,
      authorName: query.authorName,
    };
    const searchBooksOptions = {
      limit: query.limit || limitDefault,
      order: query.order || orderDefault,
    };

    const books = await this.searchBooksUseCase.execute(searchBooksData, searchBooksOptions);
    
    return this.toResponse(books, { 
      limit: searchBooksOptions.limit,
      order: searchBooksOptions.order,
    });
  }
}
