import { AuthorSummary } from '@application/summary/author.summary';
import { SearchAuthorsUseCase } from '@application/use-cases/search-authors.use-case';
import { UsecaseProxyModule } from '@infrastructure/usecase-proxy/usecase-proxy.module';
import { Controller, Get, Inject, Query } from '@nestjs/common';
import { IAuthorResponse, toAuthorResponse } from '@presenter/responses/author.response.dto';
import { IListResponse, toListResponse } from '@presenter/responses/list.response.dto';
import { SearchAuthorsQueryDto } from './search-authors.request.dto';

@Controller('authors')
export class AuthorsController {
  constructor(
    @Inject(UsecaseProxyModule.SEARCH_AUTHORS)
    private readonly searchAuthorsUseCase: SearchAuthorsUseCase,
  ) {}

  private toResponse(
    authors: AuthorSummary[],
    options: {
      limit: number,
      order: 'name_asc' | 'name_desc'
    }
  ): IListResponse<IAuthorResponse> {
    return toListResponse(
      authors.map((author) => toAuthorResponse(author)),
      {
        limit: options.limit,
        order: options.order,
      },
    );
  }

  @Get()
  async searchByPartialName(@Query() query: SearchAuthorsQueryDto) {
    const limitDefault = 100;
    const orderDefault = 'name_asc';

    if (!query.name) {
      return this.toResponse([], { limit: limitDefault, order: orderDefault });
    }

    const searchAuthorsData = {
      name: query.name,
    };
    const searchAuthorsOptions = {
      limit: query.limit || limitDefault,
      order: query.order || orderDefault,
    };

    const authors = await this.searchAuthorsUseCase.execute(searchAuthorsData, searchAuthorsOptions);

    return this.toResponse(authors, searchAuthorsOptions);
  }
}
