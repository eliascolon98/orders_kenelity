import { Column, Entity, ObjectIdColumn } from 'typeorm';
import { ObjectId } from 'mongodb';

@Entity({ name: 'orders' })
export class Order {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column({ type: 'string', nullable: false })
  clientName: string;

  @Column({ type: 'decimal', nullable: false })
  total: number;

  @Column({ type: 'array', nullable: false })
  products: {
    _id: string;
    quantity: number;
    name: string;
    picture: string;
    price: number;
  }[];

  @Column({ type: 'number', nullable: false })
  orderNumber: number;

  @Column()
  createdAt: Date;
}
