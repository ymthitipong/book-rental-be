import { CreateBookUseCase } from '@application/use-cases/create-book.use-case';
import { SearchBookByCodeUseCase } from '@application/use-cases/search-book-by-code.use-case';
import { Book } from '@domain/entities/book.entity';
import { UsecaseProxyModule } from '@infrastructure/usecase-proxy/usecase-proxy.module';
import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common';
import { IBookResponse, toBookResponse } from '@presenter/responses/book.response.dto';
import { CreateBookRequestBodyDto } from './create-book.request.dto';
import { SearchBookByCodePararmsDto } from './search-book-by-code.request.dto';

@Controller('book')
export class BookController {
  constructor(
    @Inject(UsecaseProxyModule.CREATE_BOOK)
    private readonly createBookUseCase: CreateBookUseCase,
    @Inject(UsecaseProxyModule.SEARCH_BOOK_BY_CODE)
    private readonly searchBookByCodeUseCase: SearchBookByCodeUseCase,
  ) {}

  private toResponse(book: Book): IBookResponse {
    return toBookResponse(book);
  }

  @Post()
  async create(@Body() createBookDto: CreateBookRequestBodyDto): Promise<IBookResponse> {
    const book = await this.createBookUseCase.execute(createBookDto);
    return this.toResponse(book);
  }

  @Get(':code')
  async searchByCode(@Param() params: SearchBookByCodePararmsDto): Promise<IBookResponse> {
    const book = await this.searchBookByCodeUseCase.execute(params.code);
    return this.toResponse(book);
  }

  // @Post(':code/copies')
  // async createCopies(
  //   @Param() params: CreateCopiesByBookPararmsDto, 
  //   @Body() body: CreateCopiesByBookRequestBodyDto
  // ): Promise<IBookResponse> {
    
  //   return this.toResponse(book);
  // }
}
