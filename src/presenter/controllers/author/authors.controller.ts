import { SearchAuthorsByPartialNameUseCase } from '@application/use-cases/search-authors-by-name.use-case';
import { Author } from '@domain/entities/author.entity';
import { UsecaseProxyModule } from '@infrastructure/usecase-proxy/usecase-proxy.module';
import { Controller, Get, Inject, Query } from '@nestjs/common';
import { IAuthorResponse, toAuthorResponse } from '@presenter/responses/author.response.dto';
import { IListResponse, toListResponse } from '@presenter/responses/list.response.dto';
import { SearchAuthorsByPartialNameRequestQueryDto } from './search-authors-by-partial-name.request.dto';

@Controller('authors')
export class AuthorsController {
  constructor(
    @Inject(UsecaseProxyModule.SEARCH_AUTHORS_BY_PARTIAL_NAME)
    private readonly searchAuthorsByPartialNameUseCase: SearchAuthorsByPartialNameUseCase,
  ) {}

  private toResponse(authors: Author[]): IListResponse<IAuthorResponse> {
    return toListResponse(authors.map((author) => toAuthorResponse(author)));
  }

  @Get()
  async searchByPartialName(@Query() query: SearchAuthorsByPartialNameRequestQueryDto) {
    const authors = await this.searchAuthorsByPartialNameUseCase.execute(query.name);

    return this.toResponse(authors);
  }
}
