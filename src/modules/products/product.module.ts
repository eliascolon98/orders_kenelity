import { forwardRef, Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { ProductService } from './services/product.service';
import { Product } from '@/modules/products/entities/product.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductController } from './controllers/product.controller';
import { ProductRepository } from './repositories/product.repository';

@Module({
  imports: [forwardRef(() => AuthModule), TypeOrmModule.forFeature([Product])],
  controllers: [ProductController],
  providers: [ProductService, ProductRepository],
  exports: [ProductService],
})
export class ProductModule {}
