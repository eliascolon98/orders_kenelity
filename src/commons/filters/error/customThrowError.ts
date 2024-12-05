import { ApiResponseOptions } from '@nestjs/swagger';
import { IErrorData } from '../../interfaces/errors';

/**
 * Centralized function to return errors
 * @param {IErrorData} additionalError - IErrorData - this is the error object that you want to throw.
 * @param {string} [errorCode] - The error code that you want to use.
 * @param {IObj} [additionalData] - IObj - this is an object that will be added to the error object.
 * @returns An object with the following properties:
 *   code: string
 *   message: string
 *   errorType: string
 *   description: string
 *   exceptionDetails: string
 *   additionalData: object
 */
export const customThrowError = (
  additionalError: IErrorData,
  errorCode?: string,
  additionalData?: IObj,
): IErrorData => {
  let code = errorCode || additionalError?.code;
  if (JSON.stringify(additionalError).indexOf('ERROR_WS') !== -1) {
    code = 'ERROR_WS';
  }

  return {
    code,
    message: additionalError?.message,
    errorType: additionalError?.errorType,
    description: additionalError?.description,
    exceptionDetails: additionalError?.exceptionDetails,
    additionalData: additionalError?.additionalData || additionalData,
  };
};

export const responseGeneralError: ApiResponseOptions = {
  status: 400,
  schema: {
    properties: {
      code: { type: 'string' },
      description: { type: 'string' },
      title: { type: 'string' },
      statusCode: { type: 'number' },
      path: { type: 'string' },
    },
    type: 'object',
  },
  description: 'General Response Error',
};
