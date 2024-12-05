import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '@/api/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import configuration from '@/config';
import { join } from 'path';
import { connection } from '@/models';

describe('Users - /users (e2e)', () => {
  const users = {
    id: 1,
    email: 'rompni_test@gmail.com',
    password: '12345678',
    name: 'Andres Felipe',
  };

  let app: INestApplication;
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

  it('Get all users [GET /users]', () => {
    return request(app.getHttpServer())
      .get('/users')
      .expect(200)
      .then(({ body }) => {
        expect(body).toBeDefined();
      });
  });

  it('Get one user [GET /users/:id]', () => {
    return request(app.getHttpServer())
      .get(`/users/${idTest}`)
      .expect(200)
      .then(({ body }) => {
        expect(body).toBeDefined();
      });
  });

  it('Delete one user [DELETE /users/:id]', () => {
    return request(app.getHttpServer()).delete(`/users/${idTest}`).expect(200);
  });

  afterAll(async () => {
    await app.close();
  });
});
