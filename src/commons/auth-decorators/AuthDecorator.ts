import { UseGuards, applyDecorators } from '@nestjs/common';

import {
  ApiBearerAuth,
  ApiResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { responseGeneralError } from '../filters/error/customThrowError';
import { JwtAuthGuard } from '../guards/auth.guard';

export function AuthDecorator() {
  return applyDecorators(
    UseGuards(JwtAuthGuard),
    ApiResponse(responseGeneralError),
    ApiBearerAuth(),
  );
}
