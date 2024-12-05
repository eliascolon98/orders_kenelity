//Libs
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';

/* It's a filter that catches all HttpExceptions and logs them to the console */
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly currentMicroservice = '';

  constructor(currentMicroservice: any) {
    this.currentMicroservice = currentMicroservice;
  }

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    delete request?.body?.password;

    const exceptionResponse = exception.getResponse();
    const errorType =
      typeof exceptionResponse === 'object' &&
      exceptionResponse['response'] &&
      'errorType' in exceptionResponse['response']
        ? exceptionResponse['response']['errorType']
        : null;
    const nestedResponse =
      typeof exceptionResponse === 'object' && exceptionResponse['response']
        ? exceptionResponse['response']
        : {};
    const extractedStatus = nestedResponse['status'] || status;

    const responseMessage = {
      message: exception.message,
      method: request.method,
      body: JSON.stringify(request.body),
      params: JSON.stringify(request.params),
      currentMicroservice: this.currentMicroservice,
      errorType: errorType,
      status: extractedStatus || 500,
      timestamp: new Date().toISOString(),
      path: request.url,
    };

    console.error(responseMessage);

    response.status(status).json(responseMessage);
  }
}
