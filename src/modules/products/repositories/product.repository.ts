import { Repository } from 'typeorm';
import { Product } from '../entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { BaseProductDto, FilterProductDto } from '../dtos/product.zod';
import { PageDto, PageMetaDto } from '@/commons';
import { ObjectId } from 'mongodb';

@Injectable()
export class ProductRepository {
  constructor(
    @InjectRepository(Product)
    private readonly repository: Repository<Product>,
  ) {}

  public async save(body: BaseProductDto): Promise<Product> {
    try {
      const existingProduct = await this.repository.findOne({
        where: { sku: body.sku },
      });

      if (existingProduct) {
        throw new ConflictException(
          `Product with SKU ${body.sku} already exists`,
        );
      }

      return await this.repository.save(body);
    } catch (error) {
      if (error instanceof ConflictException) {
        throw error;
      }

      throw new InternalServerErrorException('Error creating product');
    }
  }

  public async find(pageOptionsDto: FilterProductDto) {
    const { search, id, skip, take, order } = pageOptionsDto;

    const validSkip = skip && !isNaN(skip) ? parseInt(skip.toString(), 10) : 0;
    const validTake = take && !isNaN(take) ? parseInt(take.toString(), 10) : 10;

    const where: any = {};

    if (id) {
      where._id = new ObjectId(id);
    }

    if (search) {
      where.clientName = { $regex: search, $options: 'i' };
    }

    let sortProduct: any = {};
    if (order) {
      const direction = order.toLowerCase() === 'desc' ? -1 : 1;
      sortProduct = { [order]: direction };
    }

    const queryOptions = {
      where,
      order: sortProduct,
      skip: validSkip,
      take: validTake,
    };

    try {
      const entities = await this.repository.manager
        .getMongoRepository(Product)
        .find(queryOptions);

      const total = await this.repository.manager
        .getMongoRepository(Product)
        .count({ where });

      const pageMetaDto = new PageMetaDto({ total, pageOptionsDto });

      return new PageDto(entities, pageMetaDto);
    } catch (error) {
      console.error('Error fetching orders:', error);
      throw new InternalServerErrorException('Error fetching orders');
    }
  }

  public async deleteAll() {
    return this.repository.delete({});
  }
}
