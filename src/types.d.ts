// only types
import { User } from '@/modules/users/entities/user.entity';
import { Request } from 'express';

export type GeneralResponse<T> = {
  data: T;
};

export type JWTTokenDecoded = {
  id: number;
  email: string;
  iat?: number;
  exp?: number;
};

export type IRequest = Request & {
  user: User;
};

export type ILoginRequest = {
  token: string;
  user: User;
};
