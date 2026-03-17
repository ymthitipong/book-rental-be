import { HttpException } from "@nestjs/common";

export interface IFormatExceptionMessage {
  detail?: string;
  message: string;
}

export interface IException {
  badRequestException(data?: IFormatExceptionMessage): HttpException;
  forbiddenException(data?: IFormatExceptionMessage): HttpException;
  internalServerErrorException(data?: IFormatExceptionMessage): HttpException;
  notFoundException(data?: IFormatExceptionMessage): HttpException;
  unauthorizedException(data?: IFormatExceptionMessage): HttpException;
}
