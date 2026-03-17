import { Module } from "@nestjs/common";
import { ExceptionsService } from "./exceptions.service";

@Module({
  exports: [ExceptionsService],
  providers: [ExceptionsService],
})
export class ExceptionsModule {}
