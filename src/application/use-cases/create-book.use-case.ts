

import { IBookRepository } from "@domain/repositories/book.repository.interface";

export class CreateBookUseCase {
  private readonly loggerContext = "CreateBookUseCaseExecute";

  constructor(
    private readonly bookRepository: IBookRepository,
  ) {}

  async execute(code: string): Promise<any> {
    console.log(this.loggerContext, 'start');
    console.log(await this.bookRepository.findByCode(code));

    throw new Error("Method not implemented.");
  }
}
