import { Inject, Injectable } from '@nestjs/common';
import { User } from '@/modules/users/entities/user.entity';

import { LoginDto } from '../dtos/auth.zod';
import { AuthHelper } from '../helpers/auth.helper';
import { ILoginRequest } from '@/types';
import { UserService } from '@/modules/users/services/user.service';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { customThrowError } from '@/commons';

@Injectable()
export class AuthService {
  constructor(
    @Inject(AuthHelper)
    private readonly helper: AuthHelper,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  public async login(body: LoginDto): Promise<ILoginRequest> {
    const user = await this.userService.validateUser(body.email);

    if (!user) customThrowError({ message: 'User not found', code: '404' });

    const isPasswordValid: boolean = this.helper.isPasswordValid(
      body.password,
      user.password,
    );

    if (!isPasswordValid)
      customThrowError({ message: 'User or password is invalid', code: '404' });

    delete user.password;

    return await this.createUserToken(user);
  }

  async createUserToken(user: User): Promise<ILoginRequest> {
    const token: string = this.helper.generateToken(user);
    return { token, user };
  }

  async validateToken(accessToken: string, options?: JwtSignOptions) {
    return await this.jwtService.verify(accessToken, options);
  }
}
