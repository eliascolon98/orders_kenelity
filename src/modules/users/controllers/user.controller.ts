import { User } from '@/modules/users/entities/user.entity';
import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Inject,
  Post,
  Req,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { UserService } from '../services/user.service';
import { GeneralResponse, IRequest } from '@/types';
import { ZodValidationPipe } from 'nestjs-zod';

import {
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ApiResponseMe, ApiResponseRegister } from '../docs';
import { AuthDecorator } from '@/commons/auth-decorators';
import { BaseUserDto, RegisterUserSchema } from '../dtos/user.zod';

@ApiTags('Users')
@Controller('users')
export class UserController {
  @Inject(UserService)
  private readonly service: UserService;

  @Post('')
  @ApiOperation({ summary: 'Create a new user' })
  @ApiOkResponse(ApiResponseRegister)
  @UseInterceptors(ClassSerializerInterceptor)
  @UsePipes(new ZodValidationPipe(RegisterUserSchema))
  private async register(
    @Body() body: BaseUserDto,
  ): Promise<GeneralResponse<User>> {
    return {
      data: await this.service.registerUser(body),
    };
  }
}
