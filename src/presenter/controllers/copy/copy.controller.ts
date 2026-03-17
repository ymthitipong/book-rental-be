
import { BookCopySummaryWithBook } from "@application/summary/book-copy.summary";
import { SearchCopyByCodeUseCase } from "@application/use-cases/search-copy-by-code.usecase";
import { UsecaseProxyModule } from "@infrastructure/usecase-proxy/usecase-proxy.module";
import {
  Controller, Get, Inject, Param
} from "@nestjs/common";
import {
  ICopyResponse,
  toCopyResponseWithBook
} from "@presenter/responses/copy.response.dto";
import { SearchCopyByCodeParamsDto } from "./search-copy-by-code.request.dto";

@Controller("copy")
export class CopyController {
  constructor(
    @Inject(UsecaseProxyModule.SEARCH_COPY_BY_CODE)
    private readonly searchCopyByCodeUseCase: SearchCopyByCodeUseCase,
  ) {}

  private toResponse(copy: BookCopySummaryWithBook): ICopyResponse {
    // TODO: Implement response transformation
    return toCopyResponseWithBook(copy);
  }

  @Get(":code")
  async searchByCode(
    @Param() params: SearchCopyByCodeParamsDto,
  ): Promise<ICopyResponse> {
    const copy = await this.searchCopyByCodeUseCase.execute(params.code);
    return this.toResponse(copy);
  }
}
