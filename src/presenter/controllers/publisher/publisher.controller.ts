import { CreatePublisherUseCase } from '@application/use-cases/create-publisher.use-case';
import { SearchPublisherByCodeUseCase } from '@application/use-cases/search-publisher-by-code.use-case';
import { Publisher } from '@domain/entities/publisher.entity';
import { UsecaseProxyModule } from '@infrastructure/usecase-proxy/usecase-proxy.module';
import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common';
import { IPublisherResponse, toPublisherResponse } from '@presenter/responses/publisher.response.dto';
import { CreatePublisherRequestBodyDto } from './create-publisher.request.dto';
import { SearchAuthorByCodeRequestParamDto } from './search-publisher-by-code.request.dto';

@Controller('publisher')
export class PublisherController {
  constructor(
    @Inject(UsecaseProxyModule.CREATE_PUBLISHER)
    private readonly createPublisherUseCase: CreatePublisherUseCase,
    @Inject(UsecaseProxyModule.SEARCH_PUBLISHER_BY_CODE)
    private readonly searchPublisherByCodeUseCase: SearchPublisherByCodeUseCase,
  ) {}

  private toResponse(publisher: Publisher): IPublisherResponse {
    return toPublisherResponse(publisher);
  }

  @Post()
  async create(@Body() body: CreatePublisherRequestBodyDto): Promise<IPublisherResponse> {
    const publisher = await this.createPublisherUseCase.execute(body.name);

    return this.toResponse(publisher);
  }

  @Get(':code')
  async searchByCode(@Param() params: SearchAuthorByCodeRequestParamDto): Promise<IPublisherResponse> {
    const publisher = await this.searchPublisherByCodeUseCase.execute(params.code);

    return this.toResponse(publisher);
  }
}
