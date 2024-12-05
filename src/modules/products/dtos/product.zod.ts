import { PageOptionsDto } from '@/commons';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class BaseProductDto {
  @ApiProperty({
    type: 'string',
    example: 'Product1',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  picture?: string;

  @ApiProperty({
    type: 'string',
    example: '1234567890',
  })
  @IsString()
  @IsNotEmpty()
  sku: string;

  @ApiProperty({
    type: 'number',
    example: 1000,
  })
  @IsString()
  @IsNumber()
  price: number;
}

export class ProductIdParams {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  id: number;
}

export class FilterProductDto extends PageOptionsDto {
  @ApiPropertyOptional({
    description: 'Id of the product',
    example: '',
    required: false,
  })
  id: string;
}
