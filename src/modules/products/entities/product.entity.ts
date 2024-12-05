import { Entity, ObjectIdColumn, Column } from 'typeorm';
import { ObjectId } from 'mongodb';

@Entity({ name: 'products' })
export class Product {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column({ nullable: false, type: 'string' })
  name: string;

  @Column({ nullable: false, type: 'string' })
  sku: string;

  @Column({ nullable: false, type: 'string' })
  picture: string;

  @Column({ nullable: false, type: 'decimal' })
  price: number;
}
