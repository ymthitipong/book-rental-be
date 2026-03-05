import { Body, Controller, Inject, Post } from '@nestjs/common';
import { CreatePublisherUseCase } from '../../../application/use-cases/create-publisher.use-case';
import { UsecaseProxyModule } from '../../../infrastructure/usecase-proxy/usecase-proxy.module';
import { CreatePublisherRequestBodyDto } from './create-publisher.dto';

@Controller('publisher')
export class PublisherController {
  constructor(
    @Inject(UsecaseProxyModule.CREATE_PUBLISHER)
    private readonly createPublisherUseCase: CreatePublisherUseCase,
  ) {}

  @Post()
  async create(@Body() body: CreatePublisherRequestBodyDto) {
    console.log('body', body);
    const publisher = await this.createPublisherUseCase.execute(body.name);

    return {
      name: publisher.name,
      code: publisher.code,
    };
  }
}
