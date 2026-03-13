import { CreateBookUseCase } from '@application/use-cases/create-book.use-case';
import { Book } from '@domain/entities/book.entity';
import { UsecaseProxyModule } from '@infrastructure/usecase-proxy/usecase-proxy.module';
import { Body, Controller, Inject, Post } from '@nestjs/common';
import { IBookResponse, toBookResponse } from '@presenter/responses/book.response.dto';
import { CreatePublisherRequestBodyDto } from './create-book.request.dto';

@Controller('book')
export class BookController {
  constructor(
    @Inject(UsecaseProxyModule.CREATE_BOOK)
    private readonly createBookUseCase: CreateBookUseCase,
  ) {}

  private toResponse(book: Book): IBookResponse {
    return toBookResponse(book)
  }

  @Post()
  async create(@Body() createBookDto: CreatePublisherRequestBodyDto) {
    const book = await this.createBookUseCase.execute(createBookDto)
    
    return this.toResponse(book)
  }
}
