import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { SampleNotFoundException } from '../../../domains/sample/exceptions/sample-not-found.exception';

@Catch(SampleNotFoundException)
export class DomainExceptionFilter implements ExceptionFilter {
  catch(exception: SampleNotFoundException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    if (exception instanceof SampleNotFoundException) {
      response.status(HttpStatus.NOT_FOUND).json({
        statusCode: HttpStatus.NOT_FOUND,
        message: exception.message,
        error: 'Not Found',
      });
    }
  }
}
