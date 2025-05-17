import { BadRequestException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import {
  ReqChangePasswordDTO,
  ReqLoginDTO,
  ReqRegisterDTO,
} from './dto/request.dto';

import { mapReqRegisterToDb } from './mappings/upsert.mapping';
import { mapResJwt } from './mappings/view.mapping';

import { AuthenticationUserRepository } from './authentication.repository';
import { ResRegisterUserDTO, ResJWTUser } from './dto/response.dto';

@Injectable()
export class AuthenticationService {
  constructor(private readonly userRepository: AuthenticationUserRepository) {}

  async registerUser(body: ReqRegisterDTO): Promise<ResRegisterUserDTO> {
    //hash password
    const passwordHash = await bcrypt.hash(body.password, 10);
    const mapDataSave = await mapReqRegisterToDb(body, passwordHash);

    const createData = await this.userRepository.save(mapDataSave);

    const mapJwtUserData = await mapResJwt(createData);

    const token = jwt.sign(mapJwtUserData, process.env.JWT_KEY);

    createData['token'] = token;

    return { ...createData, token };
  }

  async registerAdmin(body: ReqRegisterDTO): Promise<ResRegisterUserDTO> {
    //hash password
    const passwordHash = await bcrypt.hash(body.password, 10);
    const mapDataSave = await mapReqRegisterToDb(body, passwordHash);

    const createData = await this.userRepository.save(mapDataSave);

    const mapJwtUserData = await mapResJwt(createData);

    const token = jwt.sign({ user: mapJwtUserData.user }, process.env.JWT_KEY);

    return { ...createData, token };
  }

  async login(body: ReqLoginDTO): Promise<string> {
    const query = {};

    if (body.email) {
      Object.assign(query, { email: body.email });
    } else {
      Object.assign(query, { username: body.username });
    }

    const user = await this.userRepository.findOneBy(query);

    if (user) {
      const isMatchPassword = await bcrypt.compare(
        body.password,
        user.password,
      );

      if (isMatchPassword) {
        const jwtData = await mapResJwt(user);
        const token = jwt.sign({ user: jwtData.user }, process.env.JWT_KEY);
        return token;
      }
    }
    throw new BadRequestException('Incorrect username or password');
  }

  async changePassword(body: ReqChangePasswordDTO): Promise<string> {
    const passwordHash = await bcrypt.hash(body.password, 10);

    await this.userRepository.update(
      { email: body.email },
      { password: passwordHash },
    );

    const user = await this.userRepository.findOneBy({ email: body.email });
    const jwtData = await mapResJwt(user);
    const token = jwt.sign({ user: jwtData.user }, process.env.JWT_KEY);

    return token;
  }
}
