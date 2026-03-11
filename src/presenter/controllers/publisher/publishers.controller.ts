import { SearchPublishersByPartialNameUseCase } from '@application/use-cases/search-publishers-by-partial-name.use-case';
import { Publisher } from '@domain/entities/publisher.entity';
import { UsecaseProxyModule } from '@infrastructure/usecase-proxy/usecase-proxy.module';
import { Controller, Get, Inject, Query } from '@nestjs/common';
import { IListResponse, toListResponse } from '@presenter/responses/list.response';
import { IPublisherResponse, toPublisherResponse } from '@presenter/responses/publisher.response';
import { SearchPublishersByPartialNameRequestQueryDto } from './search-publishers-by-partial-name.request.dto';

@Controller('publishers')
export class PublishersController {
  constructor(
    @Inject(UsecaseProxyModule.SEARCH_PUBLISHERS_BY_PARTIAL_NAME)
    private readonly searchPublishersByPartialNameUseCase: SearchPublishersByPartialNameUseCase,
  ) {}

  private toResponse(publishers: Publisher[]): IListResponse<IPublisherResponse> {
    return toListResponse(publishers.map((publisher) => toPublisherResponse(publisher)));
  }

  @Get()
  async searchByPartialName(@Query() query: SearchPublishersByPartialNameRequestQueryDto) {
    const publishers = await this.searchPublishersByPartialNameUseCase.execute(query.name);

    return this.toResponse(publishers);
  }
}
