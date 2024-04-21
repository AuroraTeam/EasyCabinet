import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { FastifyReply } from 'fastify';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<FastifyReply>();
    const status = exception.getStatus();

    let message: string = exception.message;
    const errorResponse = <string | ErrorResponse>exception.getResponse();
    if (errorResponse) {
      if (typeof errorResponse === 'string') {
        message = errorResponse;
      } else if (errorResponse.message) {
        if (typeof errorResponse.message === 'string') {
          message = errorResponse.message;
        } else {
          message = errorResponse.message.join(', ');
        }
      }
    }

    response.status(status).send({
      success: false,
      error: message,
    });
  }
}

interface ErrorResponse {
  message?: string | string[];
}
