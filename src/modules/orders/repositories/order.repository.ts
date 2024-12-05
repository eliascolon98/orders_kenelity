import { QueryRunner, Repository } from 'typeorm';
import { Order } from '../entities/order.entity';
import { InjectRepository } from '@nestjs/typeorm';
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { BaseOrderDto, FilterOrderDto } from '../dtos/order.zod';
import { ObjectId } from 'mongodb';
import { PageDto, PageMetaDto } from '@/commons';
import { Product } from '@/modules/products/entities/product.entity';

@Injectable()
export class OrderRepository {
  constructor(
    @InjectRepository(Order)
    private readonly repository: Repository<Order>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  public async create(order: BaseOrderDto, queryRunner: QueryRunner) {
    try {
      const productsIds = order.products.map((product) => {
        if (!ObjectId.isValid(product._id)) {
          throw new BadRequestException(`Invalid product ID: ${product._id}`);
        }
        return new ObjectId(product._id);
      });

      const products = await this.productRepository.findByIds(productsIds);
      const missingProducts = productsIds.filter(
        (id) => !products.some((product) => product._id.equals(id)),
      );

      if (missingProducts.length > 0) {
        throw new BadRequestException(
          `The following product IDs do not exist: ${missingProducts.join(
            ', ',
          )}`,
        );
      }

      const newOrder = new Order();
      newOrder.clientName = order.clientName;
      newOrder.total = order.total;
      newOrder.products = order.products;
      newOrder.createdAt = new Date();
      newOrder.orderNumber = Math.floor(Math.random() * 1000000);

      const savedOrder = await queryRunner.manager.save(Order, newOrder);

      await queryRunner.commitTransaction();
      return savedOrder;
    } catch (error) {
      console.error('Error while saving orders:', error);
      await queryRunner.rollbackTransaction();

      if (error instanceof NotFoundException) {
        throw error;
      }

      throw new InternalServerErrorException('Error creating order');
    }
  }

  public async findOrders(pageOptionsDto: FilterOrderDto) {
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

    let sortOrder: any = {};
    if (order) {
      const direction = order.toLowerCase() === 'desc' ? -1 : 1;
      sortOrder = { [order]: direction };
    }

    const queryOptions = {
      where,
      order: sortOrder,
      skip: validSkip,
      take: validTake,
    };

    try {
      const entities = await this.repository.manager
        .getMongoRepository(Order)
        .find(queryOptions);

      const total = await this.repository.manager
        .getMongoRepository(Order)
        .count({ where });

      const pageMetaDto = new PageMetaDto({ total, pageOptionsDto });

      return new PageDto(entities, pageMetaDto);
    } catch (error) {
      console.error('Error fetching orders:', error);
      throw new InternalServerErrorException('Error fetching orders');
    }
  }

  public async update(id: string, updateData: Partial<Order>) {
    try {
      const _id = new ObjectId(id);

      const existingOrder = await this.repository.findOne({
        where: {
          _id,
        },
      });

      if (!existingOrder) {
        throw new NotFoundException(`Order with id ${_id} not found`);
      }

      await this.repository.update({ _id }, updateData);

      const updatedOrder = await this.repository.findOne({
        where: {
          _id,
        },
      });

      return updatedOrder;
    } catch (error) {
      console.error('Error updating order:', error);

      throw new InternalServerErrorException({
        statusCode: 500,
        message: 'Error updating order',
        error: error.message || 'Unexpected error occurred',
      });
    }
  }

  public async getTotalSoldLastMonth(): Promise<number> {
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

    const orders = await this.repository.manager
      .getMongoRepository(Order)
      .find({
        where: { createdAt: { $gte: oneMonthAgo } },
      });

    return orders.reduce((sum, order) => sum + order.total, 0);
  }

  public async getHighestAmountOrder(): Promise<Order | null> {
    const orders = await this.repository.find();
    if (!orders.length) return null;

    return orders.reduce(
      (maxOrder, order) => (order.total > maxOrder.total ? order : maxOrder),
      orders[0],
    );
  }

  public async deleteAll() {
    return this.repository.delete({});
  }
}
