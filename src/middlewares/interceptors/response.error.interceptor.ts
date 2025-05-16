import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
// import { ErrorData, httpStatus } from 'src/common';
import { IErrorData } from 'src/common/interfaces';
import { httpStatus } from 'src/common/const';

@Catch()
export class ResponseErrorInterceptor implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    // assign request & response context
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    // assign message from thrown exception
    let message = exception.message;

    // get status code from thrown exception if stated when throwing, or ISE if not stated
    let status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    // error message string for response error_data & error object
    let errorMessage = '';

    // error object for thrown error_data
    let messageObject: IErrorData[];

    try {
      // if message is JSON stringified, parse it back to JS object
      messageObject = JSON.parse(message);
    } catch (error) {
      // if message is string, set default value for message object
      errorMessage = message;
      messageObject = [];
    }

    // error object for response error_data
    const errorDatas: IErrorData[] = [];

    // check if there is any DTO error, and push to error data message
    if (typeof exception.getResponse === 'function') {
      const resException = exception.getResponse();

      const errorDTOs =
        typeof resException === 'object'
          ? resException['message']
          : resException;

      if (Array.isArray(errorDTOs)) {
        for (const errorDTO of errorDTOs) {
          errorDatas.push({
            info: '',
            message: errorDTO,
          });
        }
      }
    }

    // map array error_data
    for (const itemError of messageObject) {
      // if message was not JS object, use thrown message
      errorMessage = itemError.message == '' ? message : itemError.message;

      let errorData: IErrorData = {
        info: itemError.info ?? '',
        message: errorMessage,
      };

      if (itemError.data) {
        errorData.data = itemError.data;
      }

      // push to error_data array
      errorDatas.push(errorData);
    }

    // build response
    const responseBody = {
      message: httpStatus[status],
      data: null,
      error: errorMessage,
      error_data: errorDatas,
    };

    response.status(status).json(responseBody);
  }
}
