import { BookCopySummaryWithBook } from "@application/summary/book-copy.summary";
import { SearchCopyByCodeUseCase } from "@application/use-cases/search-copy-by-code.use-case";
import { UpdateCopyStatusUseCase } from "@application/use-cases/update-copy-status.use-case";
import { UsecaseProxyModule } from "@infrastructure/usecase-proxy/usecase-proxy.module";
import {
  Controller, Get, Inject, Param, Patch
} from "@nestjs/common";
import {
  ICopyResponse,
  toCopyResponseWithBook
} from "@presenter/responses/copy.response.dto";
import { SearchCopyByCodeParamsDto } from "./search-copy-by-code.request.dto";
import { UpdateStatusParamsDto } from "./update-status.request.dto";

@Controller("copy")
export class CopyController {
  constructor(
    @Inject(UsecaseProxyModule.SEARCH_COPY_BY_CODE)
    private readonly searchCopyByCodeUseCase: SearchCopyByCodeUseCase,
    @Inject(UsecaseProxyModule.UPDATE_COPY_STATUS)
    private readonly updateCopyStatusUseCase: UpdateCopyStatusUseCase,
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

  @Patch(":code/repair")
  async repair(
    @Param() params: UpdateStatusParamsDto,
  ): Promise<ICopyResponse> {
    // TODO: Implement status update
    const copy = await this.updateCopyStatusUseCase.execute(params.code, "repair");

    return this.toResponse(copy);
  }

  @Patch(":code/restore")
  async restore(
    @Param() params: UpdateStatusParamsDto,
  ): Promise<ICopyResponse> {
    // TODO: Implement status update
    const copy = await this.updateCopyStatusUseCase.execute(params.code, "restore");

    return this.toResponse(copy);
  }
}
