import { Entity, ObjectIdColumn, Column } from 'typeorm';
import { ObjectId } from 'mongodb';

@Entity({ name: 'users' })
export class User {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column({ type: 'string', nullable: false, unique: true })
  email: string;

  @Column({ type: 'string', nullable: false })
  password: string;
}
