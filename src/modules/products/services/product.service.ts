import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { BaseProductDto, FilterProductDto } from '../dtos/product.zod';
import { Product } from '@/modules/products/entities/product.entity';
import { ProductRepository } from '../repositories/product.repository';
import { extname, join } from 'path';
import { mkdir, writeFile } from 'fs/promises';
import { promises as fsPromises } from 'fs';

@Injectable()
export class ProductService {
  constructor(private readonly repository: ProductRepository) {}

  async registerProduct(
    body: BaseProductDto,
    file: Express.Multer.File,
  ): Promise<Product> {
    try {
      const data = await this.uploadNewFile(file);
      const { filePath: picture } = data;
      body.picture = picture;
      const saveProduct = await this.repository.save(body);
      return saveProduct;
    } catch (error) {
      if (!(error instanceof HttpException)) {
        throw new HttpException(error, HttpStatus.BAD_REQUEST);
      }
      throw error;
    }
  }

  async uploadNewFile(file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('No file provided');
    }

    console.log('File received:', file);

    const { originalname, buffer, size } = file;

    // validate extensions
    let allowedExtensions: string[] = ['.png', '.jpg', '.jpeg', '.webp'];

    const fileExt = extname(originalname).toLowerCase();
    if (!allowedExtensions.includes(fileExt)) {
      throw new BadRequestException(
        `Only allowed extensions are: ${allowedExtensions.join(', ')}`,
      );
    }

    const maxSizeInBytes = 10 * 1024 * 1024; // 10MB
    if (size > maxSizeInBytes) {
      throw new BadRequestException(
        'File size exceeds the maximum limit of 10MB',
      );
    }

    const filename = `${Date.now()}_${originalname.replace(
      /[^a-zA-Z0-9.\-_]/g,
      '',
    )}`;

    const uploadPath = join(process.cwd(), 'uploads');
    const filePath = join(uploadPath, filename);

    try {
      await fsPromises.mkdir(uploadPath, { recursive: true });
      await fsPromises.writeFile(filePath, buffer);

      return {
        message: 'File uploaded successfully',
        filePath: filePath,
      };
    } catch (error) {
      console.error('Error saving file:', error);
      throw new BadRequestException(`Error saving file: ${error.message}`);
    }
  }

  async find(body: FilterProductDto) {
    try {
      const products = this.repository.find(body);
      return products;
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
}
