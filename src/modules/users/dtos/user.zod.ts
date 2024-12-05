import { PageOptionsDto } from '@/commons';
import { ApiProperty, ApiPropertyOptional, OmitType } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { z } from 'zod';

export const RegisterUserSchema = z.object({
  name: z.string(),
  email: z.string().email().toLowerCase(),
  password: z.string().min(8),
});

export class BaseUserDto {
  @ApiProperty({
    type: 'string',
    example: 'User1',
  })
  name: string;

  @ApiProperty({
    type: 'string',
    format: 'email',
    example: 'elias@gmail.com',
  })
  email: string;

  @ApiProperty({
    type: 'string',
    format: 'password',
    example: 'password123',
  })
  password: string;
}

export class UserIdParams {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  id: number;
}

export class FilterUserDto extends PageOptionsDto {
  @ApiProperty({
    description: 'Id of the user',
    example: '',
    required: false,
  })
  id: number;
}
