import { Order } from '@/modules/orders/entities/order.entity';
import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Put,
  Query,
  UsePipes,
} from '@nestjs/common';
import { OrderService } from '../services/order.service';
import { ZodValidationPipe } from 'nestjs-zod';

import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  BaseOrderDto,
  FilterOrderDto,
  OrderIdParams,
  RegisterOrderSchema,
  UpdateOrderDto,
  UpdateOrderSchema,
} from '../dtos/order.zod';
import to from 'await-to-js';
import { ApiResponseAllOrders, ApiResponseNewOrder } from '../docs/order.docs';
import { AuthDecorator } from '@/commons/auth-decorators';

@ApiTags('Orders')
@Controller('orders')
export class OrderController {
  @Inject(OrderService)
  private readonly service: OrderService;

  @Post()
  @ApiOperation({
    summary: 'Create a new order',
    description: 'Create a new order',
  })
  @UsePipes(new ZodValidationPipe(RegisterOrderSchema))
  @ApiResponse(ApiResponseNewOrder)
  @AuthDecorator()
  public async createOrder(@Body() order: BaseOrderDto) {
    const [error, result] = await to(this.service.createOrder(order));
    if (error) {
      throw new BadRequestException(error.message);
    }

    return result;
  }

  @Get('')
  @ApiOperation({
    summary: 'Get orders',
    description: 'Get orders, returns a list of orders, paginated and filtered',
  })
  @ApiResponse(ApiResponseAllOrders)
  @AuthDecorator()
  public async getOrders(@Query() pageFilter: FilterOrderDto) {
    const [error, result] = await to(this.service.getOrders(pageFilter));
    if (error) {
      throw new BadRequestException(error.message);
    }

    return result;
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Update an order',
    description: 'Update an order by ID, returns the updated order',
  })
  @AuthDecorator()
  @ApiResponse(ApiResponseNewOrder)
  public async updateOrder(
    @Param('id') id: string,
    @Body() updateData: UpdateOrderDto,
  ) {
    const [error, result] = await to(this.service.updateOrder(id, updateData));
    if (error) {
      throw new BadRequestException(error.message);
    }

    return result;
  }

  @Get('/analytics/total-sold-last-month')
  @ApiOperation({
    summary: 'Get the total sold last month',
    description: 'Get the total sold last month, returns a number',
  })
  @AuthDecorator()
  public async getTotalSoldLastMonth(): Promise<number> {
    const [error, result] = await to(this.service.getTotalSoldLastMonth());
    if (error) {
      throw new BadRequestException(error.message);
    }

    return result;
  }

  @Get('/analytics/highest-order')
  @ApiOperation({
    summary: 'Get the highest amount order',
    description: 'Get the highest amount order, returns the order',
  })
  @AuthDecorator()
  public async getHighestAmountOrder(): Promise<Order | null> {
    const [error, result] = await to(this.service.getHighestAmountOrder());
    if (error) {
      throw new BadRequestException(error.message);
    }

    return result;
  }
}
