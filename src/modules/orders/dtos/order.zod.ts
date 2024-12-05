import { PageOptionsDto } from '@/commons';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { z } from 'zod';
import { ObjectId } from 'mongodb';

export const RegisterOrderSchema = z.object({
  clientName: z.string(),
  total: z.number(),
  products: z.array(
    z.object({
      _id: z.string().refine((id) => ObjectId.isValid(id), {
        message: '_id must be a valid ObjectId',
      }),
      quantity: z.number(),
      name: z.string(),
      picture: z.string(),
      price: z.string(),
    }),
  ),
});

export const UpdateOrderSchema = RegisterOrderSchema.partial();

export class BaseOrderDto {
  @ApiProperty({
    description: 'Name of the client',
    example: 'Juan',
  })
  clientName: string;

  @ApiProperty({
    description: 'Total of the order',
    example: 100,
  })
  total: number;

  @ApiProperty({
    description: 'Products of the order',
    example: [
      {
        _id: '6750c7d4cf8a2ca2735196d2',
        quantity: 1,
        name: 'Product 1',
        picture: 'http://example.com/picture.jpg',
        price: 50,
      },
      {
        _id: '6750c7d4cf8a2ca2735196d2',
        quantity: 2,
        name: 'Product 2',
        picture: 'http://example.com/picture.jpg',
        price: 50,
      },
    ],
  })
  products: {
    _id: string;
    quantity: number;
    name: string;
    picture: string;
    price: number;
  }[];
  orderNumber?: number;
  createdAt?: Date;
}

export class UpdateOrderDto extends PartialType(BaseOrderDto) {}

export class OrderIdParams {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  id: number;
}

export class FilterOrderDto extends PageOptionsDto {
  @ApiProperty({
    description: 'Id of the order',
    example: '',
    required: false,
  })
  id: string;
}
