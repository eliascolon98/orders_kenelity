import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { BaseUserDto } from '../dtos/user.zod';
import { User } from '@/modules/users/entities/user.entity';
import { IRequest } from '@/types';
import { AuthHelper } from '../../auth/helpers/auth.helper';
import { UserRepository } from '../repositories/user.repository';
import to from 'await-to-js';
import { DataSource } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    private readonly repository: UserRepository,
    @Inject(AuthHelper)
    private readonly authHelper: AuthHelper,
    private readonly dataSource: DataSource,
  ) {}

  async registerUser(body: BaseUserDto): Promise<User> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      body.password = this.authHelper.encodePassword(body.password);
      const saveUser = await this.repository.save(body, queryRunner);

      delete saveUser.password;
      return saveUser;
    } catch (error) {
      if (!(error instanceof HttpException)) {
        throw new HttpException(error, HttpStatus.BAD_REQUEST);
      }
      throw error;
    }
  }

  public async validateUser(email: string): Promise<User> {
    try {
      return await this.repository.validateEmail(email);
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
}
