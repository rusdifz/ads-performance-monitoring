// authentication.service.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

import { AuthenticationService } from './authentication.service';
import { AuthenticationUserRepository } from './authentication.repository';

import {
  ReqChangePasswordDTO,
  ReqLoginDTO,
  ReqRegisterDTO,
} from './dto/request.dto';

// Mock mapping functions
jest.mock('./mappings/upsert.mapping', () => ({
  mapReqRegisterUserToDb: jest.fn((body, hash) =>
    Promise.resolve({ ...body, password: hash }),
  ),
  mapReqRegisterAdminToDb: jest.fn((body, hash) =>
    Promise.resolve({ ...body, password: hash }),
  ),
}));

jest.mock('./mappings/view.mapping', () => ({
  mapResJwtUser: jest.fn((user) => Promise.resolve({ user })),
  mapResJwtAdmin: jest.fn((admin) => Promise.resolve({ user: admin })),
}));

describe('AuthenticationService', () => {
  let service: AuthenticationService;
  let userRepository: AuthenticationUserRepository;

  // Mocks for repositories
  const mockUserRepository = {
    save: jest.fn(),
    findOneBy: jest.fn(),
    update: jest.fn(),
  };

  const mockAdminRepository = {
    save: jest.fn(),
    findOneBy: jest.fn(),
    update: jest.fn(),
  };

  // Mock bcrypt and jwt
  const bcryptHashSpy = jest.spyOn(bcrypt, 'hash');
  const bcryptCompareSpy = jest.spyOn(bcrypt, 'compare');
  const jwtSignSpy = jest.spyOn(jwt, 'sign');

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthenticationService,
        { provide: AuthenticationUserRepository, useValue: mockUserRepository },
      ],
    }).compile();

    service = module.get<AuthenticationService>(AuthenticationService);
    userRepository = module.get<AuthenticationUserRepository>(
      AuthenticationUserRepository,
    );

    // Default mocks
    bcryptHashSpy.mockImplementation(
      async (password: string) => `hashed-${password}`,
    );
    jwtSignSpy.mockImplementation(() => 'mocked-jwt-token');
  });

  describe('registerUser', () => {
    it('should hash password, save user, map jwt and return token', async () => {
      const body: ReqRegisterDTO = {
        password: 'pass123',
        email: 'user@example.com',
      } as any;
      const savedUser = {
        id: 'user-id',
        email: body.email,
        password: 'hashed-pass123',
      };
      mockUserRepository.save.mockResolvedValue(savedUser);

      const result = await service.registerUser(body);

      expect(bcryptHashSpy).toHaveBeenCalledWith(body.password, 10);
      expect(mockUserRepository.save).toHaveBeenCalledWith(
        expect.objectContaining({ password: 'hashed-pass123' }),
      );
      expect(jwtSignSpy).toHaveBeenCalledWith(
        { user: savedUser },
        process.env.JWT_KEY_USER,
      );
      expect(result).toEqual(
        expect.objectContaining({ token: 'mocked-jwt-token' }),
      );
    });
  });

  describe('login', () => {
    const loginBody: ReqLoginDTO = {
      email: 'user@example.com',
      password: 'pass123',
    };

    it('should login admin successfully and return token', async () => {
      const adminUser = { email: loginBody.email, password: 'hashed-pass' };
      mockAdminRepository.findOneBy.mockResolvedValue(adminUser);
      // bcryptCompareSpy.mockResolvedValue();

      const result = await service.login(loginBody, true);

      expect(mockAdminRepository.findOneBy).toHaveBeenCalledWith({
        email: loginBody.email,
      });
      expect(bcryptCompareSpy).toHaveBeenCalledWith(
        loginBody.password,
        adminUser.password,
      );
      expect(jwtSignSpy).toHaveBeenCalledWith(
        { user: adminUser },
        process.env.JWT_KEY_ADMIN,
      );
      expect(result).toBe('mocked-jwt-token');
    });

    it('should login user successfully and return token', async () => {
      const user = { email: loginBody.email, password: 'hashed-pass' };
      mockUserRepository.findOneBy.mockResolvedValue(user);
      // bcryptCompareSpy.mockResolvedValue(true);
      mockUserRepository.update.mockResolvedValue(undefined);

      const { mapResJwtUser } = require('./mappings/view.mapping');
      mapResJwtUser.mockResolvedValue({ user });

      const result = await service.login(loginBody, false);

      expect(mockUserRepository.findOneBy).toHaveBeenCalledWith({
        email: loginBody.email,
      });
      expect(bcryptCompareSpy).toHaveBeenCalledWith(
        loginBody.password,
        user.password,
      );
      expect(mockUserRepository.update).toHaveBeenCalled();
      expect(jwtSignSpy).toHaveBeenCalledWith(
        { user },
        process.env.JWT_KEY_USER,
      );
      expect(result).toBe('mocked-jwt-token');
    });

    it('should throw BadRequestException if credentials invalid', async () => {
      mockAdminRepository.findOneBy.mockResolvedValue(null);
      mockUserRepository.findOneBy.mockResolvedValue(null);

      await expect(service.login(loginBody, true)).rejects.toThrow(
        BadRequestException,
      );
      await expect(service.login(loginBody, false)).rejects.toThrow(
        BadRequestException,
      );
    });
  });

  describe('changePassword', () => {
    const changePasswordDto: ReqChangePasswordDTO = {
      email: 'user@example.com',
      password: 'newpass',
      reenter_password: 'newpass',
    };

    it('should update admin password and return new token', async () => {
      const adminUser = {
        email: changePasswordDto.email,
        password: 'hashed-oldpass',
      };
      mockAdminRepository.update.mockResolvedValue(undefined);
      mockAdminRepository.findOneBy.mockResolvedValue(adminUser);

      const { mapResJwtAdmin } = require('./mappings/view.mapping');
      mapResJwtAdmin.mockResolvedValue({ user: adminUser });

      const result = await service.changePassword(changePasswordDto, true);

      expect(bcryptHashSpy).toHaveBeenCalledWith(
        changePasswordDto.password,
        10,
      );
      expect(mockAdminRepository.update).toHaveBeenCalledWith(
        { email: changePasswordDto.email },
        { password: 'hashed-newpass' },
      );
      expect(mockAdminRepository.findOneBy).toHaveBeenCalledWith({
        email: changePasswordDto.email,
      });
      expect(jwtSignSpy).toHaveBeenCalledWith(
        { user: adminUser },
        process.env.JWT_KEY_ADMIN,
      );
      expect(result).toBe('mocked-jwt-token');
    });

    it('should update user password and return new token', async () => {
      const user = {
        email: changePasswordDto.email,
        password: 'hashed-oldpass',
      };
      mockUserRepository.update.mockResolvedValue(undefined);
      mockUserRepository.findOneBy.mockResolvedValue(user);

      const { mapResJwtUser } = require('./mappings/view.mapping');
      mapResJwtUser.mockResolvedValue({ user });

      const result = await service.changePassword(changePasswordDto, false);

      expect(bcryptHashSpy).toHaveBeenCalledWith(
        changePasswordDto.password,
        10,
      );
      expect(mockUserRepository.update).toHaveBeenCalledWith(
        { email: changePasswordDto.email },
        { password: 'hashed-newpass' },
      );
      expect(mockUserRepository.findOneBy).toHaveBeenCalledWith({
        email: changePasswordDto.email,
      });
      expect(jwtSignSpy).toHaveBeenCalledWith(
        { user },
        process.env.JWT_KEY_USER,
      );
      expect(result).toBe('mocked-jwt-token');
    });
  });
});
