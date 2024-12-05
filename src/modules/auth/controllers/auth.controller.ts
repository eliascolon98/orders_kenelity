import {
  Body,
  Controller,
  Inject,
  Post,
  UseGuards,
  Req,
  UsePipes,
  HttpCode,
  HttpStatus,
  Request,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { LoginDto, LoginSchema } from '../dtos/auth.zod';

import { AuthService } from '../services/auth.service';
import { GeneralResponse, ILoginRequest } from '@/types';
import { ZodValidationPipe } from 'nestjs-zod';

import {
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import to from 'await-to-js';
import { ApiResponseLogin } from '../docs/authentication.docs';
import { ValidateAuthPayload } from '../dtos/auth.dto';
import { customThrowError } from '@/commons';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';

@ApiTags('Authentication')
@Controller('')
export class AuthController {
  @Inject(AuthService)
  private readonly service: AuthService;

  @Post('login')
  @ApiOperation({ summary: 'Login in the app' })
  @UsePipes(new ZodValidationPipe(LoginSchema))
  @ApiOkResponse(ApiResponseLogin)
  @HttpCode(HttpStatus.OK)
  async login(@Body() body: LoginDto): Promise<GeneralResponse<ILoginRequest>> {
    return {
      data: await this.service.login(body),
    };
  }

  @MessagePattern('validateToken')
  @ApiOperation({ summary: 'Validate Active Session Via Microservice.' })
  async validateAuthentication(@Payload() payload: ValidateAuthPayload) {
    const [error, tokenVerified] = await to(
      this.service.validateToken(payload.accessToken),
    );

    if (error) {
      throw new RpcException(customThrowError(error));
    }

    return tokenVerified;
  }
}
