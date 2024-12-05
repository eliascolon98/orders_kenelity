import { ObjectId, QueryRunner, Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
  ) {}

  public async save(user: any, queryRunner: QueryRunner): Promise<User> {
    return await queryRunner.manager.save(User, user);
  }

  public async validateEmail(email: string): Promise<User> {
    const getUser = await this.repository.findOne({
      where: { email },
      select: ['_id', 'password'],
    });

    return getUser;
  }
  public async findOne(id: string): Promise<User | null> {
    const objectId = new ObjectId(id); // Convierte el string a ObjectID
    return await this.repository.findOne({
      where: { _id: objectId },
      select: ['_id', 'password'],
    });
  }
}
