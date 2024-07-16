import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class CustomExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse();

    let errorResponse;

    if (typeof exceptionResponse === 'string') {
      errorResponse = {
        success: false,
        statusCode: status,
        message: exceptionResponse,
        error: {
          message: [exceptionResponse],
        },
      };
    } else {
      errorResponse = {
        success: false,
        statusCode: status,
        message:
          exceptionResponse['error'] || exception.message || 'Bad Request',
        error: {
          message: exceptionResponse['message'],
        },
      };
    }

    response.status(status).json(errorResponse);
  }
}
