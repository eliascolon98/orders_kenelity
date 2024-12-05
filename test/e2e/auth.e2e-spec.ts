import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { UserModule } from '@/api/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import configuration from '@/config';
import { join } from 'path';
import { connection } from '@/models';

describe('Users - /users (e2e)', () => {
  const users = {
    email: 'customer@imaginamos.com',
    password: 'password123',
    name: 'Andres Felipe',
  };

  let app: INestApplication;
  let tokenLogged: string;
  let idTest: number;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          envFilePath: join(__dirname, '.env'),
          load: [configuration],
          isGlobal: true,
        }),
        PassportModule.register({ defaultStrategy: 'jwt', property: 'user' }),
        JwtModule,
        connection,
        UserModule,
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('Create [POST /users]', () => {
    return request(app.getHttpServer())
      .post('/users')
      .send(users)
      .expect(201)
      .then(({ body }) => {
        idTest = body.data.id;
        expect(body.data.email).toBe(users.email);
      });
  });

  it('login user', () => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: users.email, password: users.password })
      .expect(200)
      .then(({ body }) => {
        tokenLogged = body.data.token;
        expect(body).toBeDefined();
      });
  });

  it('refresh token', () => {
    return request(app.getHttpServer())
      .post('/auth/refresh')
      .set('Authorization', `Bearer ${tokenLogged}`)
      .expect(200)
      .then(({ body }) => {
        expect(body).toBeDefined();
      });
  });

  afterAll(async () => {
    await request(app.getHttpServer()).delete(`/users/${idTest}`);
    await app.close();
  });
});
