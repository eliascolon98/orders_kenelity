import { ApiProperty } from '@nestjs/swagger';
import { IsJWT, IsNotEmpty } from 'class-validator';

export class ValidateAuthPayload {
  @IsJWT()
  @IsNotEmpty()
  @ApiProperty()
  accessToken: string;
}
