import { Author } from "@domain/entities/author.entity";
import type { ILogger } from "@domain/logger.interface";
import type { IAuthorRepository } from "@domain/repositories/author.repository.interface";
import { AuthorName } from "@domain/value-object/author-name";

export class SearchAuthorsByPartialNameUseCase {
  private readonly loggerContext = "SearchAuthorsByPartialNameUseCase";

  constructor(
    private readonly authorRepository: IAuthorRepository,
    private readonly logger: ILogger,
  ) {}

  async execute(name: string): Promise<Author[]> {
    this.logger.info(this.loggerContext, "start");
    
    const publishers = await this.authorRepository.findAllByPartialName(AuthorName.create(name));
    
    this.logger.info(this.loggerContext, "end");
    return publishers;
  }
}
