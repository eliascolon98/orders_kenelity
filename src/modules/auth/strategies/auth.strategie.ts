import { Injectable, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from '@/modules/users/entities/user.entity';
import { AuthHelper } from '../helpers/auth.helper';
import { JWTTokenDecoded } from '@/types';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(ConfigService) config: ConfigService,
    @Inject(AuthHelper) readonly helper: AuthHelper,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get('jwt.key'),
    });
  }

  async validate(payload: JWTTokenDecoded): Promise<User> {
    console.log(payload, 'payload');
    return await this.helper.validateUser(payload.id.toString());
  }
}
