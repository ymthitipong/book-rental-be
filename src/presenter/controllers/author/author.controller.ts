import { CreateAuthorUseCase } from '@application/use-cases/create-author.use-case';
import { SearchAuthorByCodeUseCase } from '@application/use-cases/search-author-by-code.use-case';
import { Author } from '@domain/entities/author.entity';
import { UsecaseProxyModule } from '@infrastructure/usecase-proxy/usecase-proxy.module';
import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common';
import { IAuthorResponse, toAuthorResponse } from '@presenter/responses/author.response.dto';
import { CreateAuthorRequestBodyDto } from './create-author.request.dto';
import { SearchAuthorByCodeRequestParamDto } from './search-author-by-code.request.dto';

@Controller('author')
export class AuthorController {
  constructor(
    @Inject(UsecaseProxyModule.CREATE_AUTHOR)
    private readonly createAuthorUseCase: CreateAuthorUseCase,
    @Inject(UsecaseProxyModule.SEARCH_AUTHOR_BY_CODE)
    private readonly searchAuthorByCodeUseCase: SearchAuthorByCodeUseCase,
  ) {}

  private toResponse(author: Author): IAuthorResponse {
    return toAuthorResponse(author)
  }

  @Post()
  async create(@Body() body: CreateAuthorRequestBodyDto): Promise<IAuthorResponse> {
    const author = await this.createAuthorUseCase.execute(body.name, body.yearOfBirth);

    return this.toResponse(author);
  }

  @Get(':code')
  async searchByCode(@Param() params: SearchAuthorByCodeRequestParamDto): Promise<IAuthorResponse> {
    const author = await this.searchAuthorByCodeUseCase.execute(params.code);

    return this.toResponse(author);
  }
}
