import { AuthorSummary, AuthorSummaryMapper } from "@application/summary/author.summary";
import type { ILogger } from "@domain/logger.interface";
import type { IAuthorRepository } from "@domain/repositories/author.repository.interface";
import { RepositoryOrderSelectionType } from "@domain/repositories/repository.interface";
import { AuthorName } from "@domain/value-object/author-name";

interface ISearchAuthorsData {
  name: string;
}

interface ISearchAuthorsOptions {
  limit: number;
  order: string;
}

export class SearchAuthorsUseCase {
  private readonly loggerContext = "SearchAuthorsUseCase";

  constructor(
    private readonly authorRepository: IAuthorRepository,
    private readonly logger: ILogger,
  ) {}

  async execute(data: ISearchAuthorsData, options: ISearchAuthorsOptions): Promise<AuthorSummary[]> {
    this.logger.info(this.loggerContext, "start");

    const findAllProps = {
      name: data.name ? AuthorName.create(data.name) : undefined,
    };
    const findAllOptions = {
      limit: options.limit,
      order: toAuthorRepositoryOrder(options.order),
    };
    
    const authors = await this.authorRepository.findAll(findAllProps, findAllOptions);
    
    this.logger.info(this.loggerContext, "end");
    return AuthorSummaryMapper.toListSummary(authors);
  }
}

const toAuthorRepositoryOrder = (usecaseOrder: string): { ['name']: RepositoryOrderSelectionType } => {
  switch (usecaseOrder) {
    case 'name_desc':
      return { name: 'desc' };
    default:
      return { name: 'asc' };
  }
}
