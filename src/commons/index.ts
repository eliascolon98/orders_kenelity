import { ApiProperty } from '@nestjs/swagger';
import { z } from 'zod';
import { SetMetadata } from '@nestjs/common';
import {
  customThrowError,
  responseGeneralError,
} from './filters/error/customThrowError';

import {
  Order,
  PageDto,
  PageMetaDto,
  PageMetaDtoParameters,
  PageOptionsDto,
} from './utils/Pagination';
import constants from './constants';

const comodinSchema = z.object({
  id: z.number(),
});

class ITokenDto {
  id: number;
  email: string;
}

class SendEmailDTO<T> {
  toAddress: string;
  fromAddress: string;
  subject: string;
  templateName: string;
  data: T;
}

export {
  comodinSchema,
  ITokenDto,
  SendEmailDTO,
  customThrowError,
  responseGeneralError,
  Order,
  PageOptionsDto,
  PageMetaDtoParameters,
  PageMetaDto,
  PageDto,
  constants,
};
