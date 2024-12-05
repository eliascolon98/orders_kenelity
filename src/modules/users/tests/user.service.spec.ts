/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '@/api/user/user.service';
import { UserModule } from '@/api/user/user.module';
import { User } from '@/modules/users/entities/user.entity';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { join } from 'path';
import configuration from '@/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RegisterDto } from '../dtos/user.zod';
import { connection } from '@/models';
describe('UserService', () => {
  let service: UserService;
  let module: TestingModule;
  let myUser: User;

  const mockRegister: RegisterDto = {
    email: `tempEmail+${Math.random()}@gmail.com`,
    password: 'tempPassword',
  };

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          envFilePath: join(__dirname, '.env'),
          load: [configuration],
          isGlobal: true,
        }),
        PassportModule.register({ defaultStrategy: 'jwt', property: 'user' }),
        JwtModule,
        connection,
        TypeOrmModule.forFeature([User]),
        UserModule,
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should have the service defined', () => {
    expect(service).toBeDefined();
  });

  describe('#create', () => {
    beforeEach(() => {
      jest.spyOn(service, 'register');
    });

    it('should be defined', () => {
      expect(service.register).toBeDefined();
    });

    it('should call the database', async () => {
      const user = await service.register(mockRegister);
      myUser = user;
      expect(user).toBeInstanceOf(User);
    });

    it('should throw a conflict', async () => {
      try {
        await service.register(mockRegister);
      } catch (e) {
        expect(e.status).toBe(409);
      }
    });
  });

  describe('#getAll', () => {
    beforeEach(() => {
      jest.spyOn(service, 'getAll');
    });

    it('should be defined', () => {
      expect(service.getAll).toBeDefined();
    });

    it('should call the database', async () => {
      await service.getAll();
      expect(service.getAll).toHaveBeenCalledTimes(1);
    });

    it('should return an array', async () => {
      const res = await service.getAll();
      expect(res).toBeInstanceOf(Array);
    });
  });

  describe('#get', () => {
    beforeEach(() => {
      jest.spyOn(service, 'getById');
    });

    it('should be defined', () => {
      expect(service.getById).toBeDefined();
    });

    it('should call the database', () => {
      service.getById(myUser.id.toString());
      expect(service.getById).toHaveBeenCalledTimes(1);
    });

    it('should return a user', async () => {
      const res = await service.getById(myUser.id.toString());
      expect(res).toBeInstanceOf(User);
    });

    it('should throw a not found', async () => {
      try {
        await service.getById('0');
      } catch (e) {
        expect(e.status).toBe(404);
      }
    });
  });

  describe('#update', () => {
    beforeEach(() => {
      jest.spyOn(service, 'updateName');
    });

    it('should be defined', () => {
      expect(service.updateName).toBeDefined();
    });

    it('should call the database', async () => {
      await service.updateName({ name: 'tempName' }, { user: myUser } as any);
      expect(service.updateName).toHaveBeenCalledTimes(1);
    });

    it('should return a user', async () => {
      const res = await service.getById(myUser.id.toString());
      expect(res.name).toBe('tempName');
    });
  });

  describe('#me', () => {
    beforeEach(() => {
      jest.spyOn(service, 'me');
    });

    it('should be defined', () => {
      expect(service.me).toBeDefined();
    });

    it('should call the database', () => {
      service.me({ user: myUser } as any);
      expect(service.me).toHaveBeenCalledTimes(1);
    });

    it('should return a user', async () => {
      const res = await service.me({ user: myUser } as any);
      expect(res).toBeInstanceOf(User);
    });

    it('should throw a not found', async () => {
      try {
        await service.me({ user: { id: 0 } } as any);
      } catch (e) {
        expect(e.status).toBe(404);
      }
    });
  });

  describe('#delete', () => {
    beforeEach(() => {
      jest.spyOn(service, 'delete');
    });

    it('should be defined', () => {
      expect(service.delete).toBeDefined();
    });

    it('should call the database', () => {
      service.delete(myUser.id.toString());
      expect(service.delete).toHaveBeenCalledTimes(1);
    });
  });

  afterAll((done) => {
    module.close().then(() => {
      done();
    });
  });
});
