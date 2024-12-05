import {
  BadRequestException,
  Controller,
  Get,
  Inject,
  Post,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ProductService } from '../services/product.service';
import {
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import {
  ApiResponseAllProducts,
  ApiResponseProduct,
} from '../docs/product.docs';
import { AuthDecorator } from '@/commons/auth-decorators';
import { BaseProductDto, FilterProductDto } from '../dtos/product.zod';
import { FileInterceptor } from '@nestjs/platform-express';
import { Multer } from 'multer';
import to from 'await-to-js';

@ApiTags('Products')
@Controller('products')
export class ProductController {
  @Inject(ProductService)
  private readonly service: ProductService;

  @Post('')
  @ApiOperation({
    summary: 'Create a new product',
    description:
      'just images with maximum size of 2MB are allowed (jpg, jpeg, png, webp)',
  })
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Upload a file',
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @AuthDecorator()
  @ApiResponse(ApiResponseProduct)
  private async register(
    @UploadedFile() file: Express.Multer.File,
    @Query() body: BaseProductDto,
  ) {
    const [error, result] = await to(this.service.registerProduct(body, file));
    if (error) {
      throw new BadRequestException(error.message);
    }

    return result;
  }

  @Get('')
  @ApiOperation({ summary: 'Get all products' })
  @ApiResponse(ApiResponseAllProducts)
  @AuthDecorator()
  private async getProducts(@Query() body: FilterProductDto) {
    const [error, result] = await to(this.service.find(body));
    if (error) {
      throw new BadRequestException(error.message);
    }

    return result;
  }
}
