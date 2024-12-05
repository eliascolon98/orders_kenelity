import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import {
  BaseOrderDto,
  FilterOrderDto,
  UpdateOrderDto,
} from '../dtos/order.zod';
import { Order } from '@/modules/orders/entities/order.entity';
import { OrderRepository } from '../repositories/order.repository';
import { DataSource } from 'typeorm';

@Injectable()
export class OrderService {
  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly dataSource: DataSource,
  ) {}

  public async createOrder(order: BaseOrderDto): Promise<Order> {
    try {
      const queryRunner = this.dataSource.createQueryRunner();
      await queryRunner.connect();
      await queryRunner.startTransaction();

      const createdOrder = await this.orderRepository.create(
        order,
        queryRunner,
      );

      return createdOrder;
    } catch (error) {
      throw new HttpException(
        'Error creating order',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  public async getOrders(pageFilter: FilterOrderDto) {
    try {
      const orders = this.orderRepository.findOrders(pageFilter);
      return orders;
    } catch (error) {
      throw new HttpException(
        'Error getting orders',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  public async updateOrder(id: string, updateData: UpdateOrderDto) {
    try {
      const updatedOrder = this.orderRepository.update(id, updateData);
      return updatedOrder;
    } catch (error) {
      throw new HttpException(
        'Error updating order',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  public async getTotalSoldLastMonth(): Promise<number> {
    try {
      const totalSold = this.orderRepository.getTotalSoldLastMonth();
      return totalSold;
    } catch (error) {
      throw new HttpException(
        'Error getting total sold last month',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  public async getHighestAmountOrder(): Promise<Order | null> {
    try {
      const highestAmountOrder = this.orderRepository.getHighestAmountOrder();
      return highestAmountOrder;
    } catch (error) {
      throw new HttpException(
        'Error getting highest amount order',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
