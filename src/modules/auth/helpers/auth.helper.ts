import {
  Injectable,
  HttpException,
  HttpStatus,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { DataSource } from 'typeorm';
import { User } from '@/modules/users/entities/user.entity';
import * as bcrypt from 'bcryptjs';
import { JWTTokenDecoded } from '@/types';
import { ITokenDto } from '@/commons';
import { ObjectId } from 'mongodb';

@Injectable()
export class AuthHelper {
  constructor(
    private readonly jwt: JwtService,
    private readonly dataSource: DataSource,
  ) {
    this.jwt = jwt;
  }

  // Decoding the JWT Token
  public async decode(token: string): Promise<ITokenDto> {
    return this.jwt.decode(token, null);
  }

  // Get User by User ID we get from decode()
  public async validateUser(decoded: string): Promise<User | null> {
    try {
      const objectId = new ObjectId(decoded);
      console.log(objectId);
      const data = await this.dataSource.manager.findOne(User, {
        where: { _id: objectId },
        select: ['_id', 'email'],
      });
      console.log(data);
      return data;
    } catch (error) {
      throw new Error('Invalid ID format');
    }
  }

  // Generate JWT Token
  public generateToken(user: User): string {
    return this.jwt.sign({ id: user._id, email: user.email });
  }

  // Validate User's password
  public isPasswordValid(password: string, userPassword: string): boolean {
    return bcrypt.compareSync(password, userPassword);
  }

  // Encode User's password
  public encodePassword(password: string): string {
    const salt: string = bcrypt.genSaltSync(10);

    return bcrypt.hashSync(password, salt);
  }

  // Validate JWT Token, throw forbidden error if JWT Token is invalid
  public async validate(token: string): Promise<boolean> {
    const decoded: JWTTokenDecoded = this.jwt.verify(token);

    if (!decoded) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }
    const userId = decoded.id.toString();

    const user: User = await this.validateUser(userId);

    if (!user) {
      throw new UnauthorizedException();
    }

    return true;
  }
}
