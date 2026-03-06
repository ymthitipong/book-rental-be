import { Publisher } from '@domain/entities/publisher.entity';
import { Body, Controller, Inject, Post } from '@nestjs/common';
import { CreatePublisherUseCase } from '../../../application/use-cases/create-publisher.use-case';
import { UsecaseProxyModule } from '../../../infrastructure/usecase-proxy/usecase-proxy.module';
import { CreatePublisherRequestBodyDto } from './create-publisher.dto';
import { PublisherResponse } from './publisher.response';

@Controller('publisher')
export class PublisherController {
  constructor(
    @Inject(UsecaseProxyModule.CREATE_PUBLISHER)
    private readonly createPublisherUseCase: CreatePublisherUseCase,
  ) {}

  private toResponse(publisher: Publisher): PublisherResponse {
    return {
      object: 'publisher',
      code: publisher.code,
      name: publisher.name,
    };
  }

  @Post()
  async create(@Body() body: CreatePublisherRequestBodyDto): Promise<PublisherResponse> {
    const publisher = await this.createPublisherUseCase.execute(body.name);

    return this.toResponse(publisher);
  }
}
