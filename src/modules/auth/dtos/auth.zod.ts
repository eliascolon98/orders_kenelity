import { ApiProperty } from '@nestjs/swagger';
import { Trim } from 'class-sanitizer';
import { z } from 'zod';

export const LoginSchema = z.object({
  email: z.string().email().toLowerCase(),
  password: z.string().min(8),
});

export class LoginDto {
  @ApiProperty({
    type: 'string',
    format: 'email',
    example: 'elias@gmail.com',
  })
  @Trim()
  public readonly email: string;

  @ApiProperty({
    type: 'string',
    format: 'password',
    example: 'password123',
  })
  public readonly password: string;
}
