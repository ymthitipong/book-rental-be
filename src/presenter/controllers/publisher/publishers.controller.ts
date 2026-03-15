import { SearchPublishersUseCase } from '@application/use-cases/search-publishers.use-case';
import { Publisher } from '@domain/entities/publisher.entity';
import { UsecaseProxyModule } from '@infrastructure/usecase-proxy/usecase-proxy.module';
import { Controller, Get, Inject, Query } from '@nestjs/common';
import { IListResponse, toListResponse } from '@presenter/responses/list.response.dto';
import { IPublisherResponse, toPublisherResponse } from '@presenter/responses/publisher.response.dto';
import { SearchPublishersByPartialNameRequestQueryDto } from './search-publishers.request.dto';

@Controller('publishers')
export class PublishersController {
  constructor(
    @Inject(UsecaseProxyModule.SEARCH_PUBLISHERS)
    private readonly searchPublishersUseCase: SearchPublishersUseCase,
  ) {}

  private toResponse(
    publishers: Publisher[],
    options: {
      limit: number,
      order: 'name_asc' | 'name_desc'
    }
  ): IListResponse<IPublisherResponse> {
    return toListResponse(
      publishers.map((publisher) => toPublisherResponse(publisher)),
      {
        limit: options.limit,
        order: options.order,
      },
    );
  }

  @Get()
  async searchByPartialName(@Query() query: SearchPublishersByPartialNameRequestQueryDto) {

    const limitDefault = 100;
    const orderDefault = 'name_asc';

    if (!query.name) {
      return this.toResponse([], { limit: limitDefault, order: orderDefault });
    }

    const searchPublishersData = {
      name: query.name,
    };
    const searchPublishersOptions = {
      limit: query.limit || limitDefault,
      order: query.order || orderDefault,
    };
    const publishers = await this.searchPublishersUseCase.execute(searchPublishersData, searchPublishersOptions);

    return this.toResponse(publishers, searchPublishersOptions);
  }
}
