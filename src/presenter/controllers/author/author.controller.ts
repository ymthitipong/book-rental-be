import { CreateAuthorUseCase } from '@application/use-cases/create-author.use-case';
import { Author } from '@domain/entities/author.entity';
import { UsecaseProxyModule } from '@infrastructure/usecase-proxy/usecase-proxy.module';
import { Body, Controller, Inject, Post } from '@nestjs/common';
import { AuthorResponse } from './author.response';
import { CreateAuthorRequestBodyDto } from './create-author.dto';

@Controller('author')
export class AuthorController {
  constructor(
    @Inject(UsecaseProxyModule.CREATE_AUTHOR)
    private readonly createAuthorUseCase: CreateAuthorUseCase,
  ) {}

  private toResponse(author: Author): AuthorResponse  {
    
    return {
      object: 'author',
      code: author.code,
      name: author.name,
      yearOfBirth: author.yearOfBirth,
    };
  }

  @Post()
  async create(@Body() body: CreateAuthorRequestBodyDto): Promise<AuthorResponse> {
    const author = await this.createAuthorUseCase.execute(body.name, body.yearOfBirth);

    return this.toResponse(author);
  }
}
