import { BookCopySummary } from "@application/summary/book-copy.summary";
import { BookSummary } from "@application/summary/book.summary";
import { CreateBookUseCase } from "@application/use-cases/create-book.use-case";
import { CreateCopiesByBookUseCase } from "@application/use-cases/create-copies-by-book.use-case";
import { SearchBookByCodeUseCase } from "@application/use-cases/search-book-by-code.use-case";
import { UsecaseProxyModule } from "@infrastructure/usecase-proxy/usecase-proxy.module";
import {
 Body, Controller, Get, Inject, Param, Post 
} from "@nestjs/common";
import {
  IBookResponse,
  toBookResponse,
  toBookResponseWithCopies,
} from "@presenter/responses/book.response.dto";
import { CreateBookRequestBodyDto } from "./create-book.request.dto";
import {
  CreateCopiesByBookPararmsDto,
  CreateCopiesByBookRequestBodyDto,
} from "./create-copies-by-book.request.dto";
import { SearchBookByCodePararmsDto } from "./search-book-by-code.request.dto";

@Controller("book")
export class BookController {
  constructor(
    @Inject(UsecaseProxyModule.CREATE_BOOK)
    private readonly createBookUseCase: CreateBookUseCase,
    @Inject(UsecaseProxyModule.SEARCH_BOOK_BY_CODE)
    private readonly searchBookByCodeUseCase: SearchBookByCodeUseCase,
    @Inject(UsecaseProxyModule.CREATE_COPIES_BY_BOOK)
    private readonly createCopiesByBookUseCase: CreateCopiesByBookUseCase,
  ) {}

  private toResponse(book: BookSummary): IBookResponse {
    return toBookResponse(book);
  }

  private toResponseWithCopies(
    book: BookSummary,
    copies: BookCopySummary[],
  ): IBookResponse {
    return toBookResponseWithCopies(book, copies);
  }

  @Post()
  async create(
    @Body() createBookDto: CreateBookRequestBodyDto,
  ): Promise<IBookResponse> {
    const book = await this.createBookUseCase.execute(createBookDto);
    return this.toResponse(book);
  }

  @Get(":code")
  async searchByCode(
    @Param() params: SearchBookByCodePararmsDto,
  ): Promise<IBookResponse> {
    const book = await this.searchBookByCodeUseCase.execute(params.code);
    return this.toResponse(book);
  }

  @Post(":code/copies")
  async createCopies(
    @Param() params: CreateCopiesByBookPararmsDto,
    @Body() body: CreateCopiesByBookRequestBodyDto,
  ): Promise<IBookResponse> {
    const { book, newCopies: copies } =
      await this.createCopiesByBookUseCase.execute(
        params.code,
        body.newCopyCount,
      );

    // return this.toResponse(book, true);
    return this.toResponseWithCopies(book, copies);
  }
}
