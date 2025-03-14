import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { isEmpty } from '@nestjs/common/utils/shared.utils';
import { HTTPError } from '../../../helpers/error';
import { CreateUserDto } from '../dto/create-user.dto';
import { v4 as uid } from 'uuid';

const selectedFieldsForResponse = {
  username: true,
  refreshToken: true,
  id: true,
  banned: true,
};

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async findAll(): Promise<UserEntity[]> {
    return await this.userRepository.find({
      select: selectedFieldsForResponse,
    });
  }

  async create(userDtp: CreateUserDto): Promise<CreateUserDto> {
    const { username = '', password = '' } = userDtp;

    const tryToFind = await this.findByName(username);
    if (tryToFind) {
      throw HTTPError(
        'Пользователь с таким ником уже существует',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (isEmpty(username) || isEmpty(password))
      throw HTTPError(
        isEmpty(username) ? 'Пустой никнейм' : 'Пустой пароль',
        HttpStatus.BAD_REQUEST,
      );

    const newUser = new UserEntity();

    newUser.username = username;
    newUser.password = password;
    newUser.refreshToken = uid();

    return await this.userRepository.save(newUser);
  }

  async findByToken(refreshToken: string) {
    return await this.userRepository.findOne({
      where: { refreshToken },
      select: { ...selectedFieldsForResponse },
    });
  }

  async findByName(username: string, getPassword = false): Promise<UserEntity> {
    return await this.userRepository.findOne({
      where: { username },
      select: { ...selectedFieldsForResponse, password: getPassword },
    });
  }

  async remove(username: string): Promise<{ message: string }> {
    const tryToFind = await this.findByName(username);
    if (!tryToFind) {
      throw HTTPError('Пользователя не существует', HttpStatus.BAD_REQUEST);
    }

    await this.userRepository.delete(username);
    return { message: 'Пользователь успешно удален' };
  }

  async updateUser(User: CreateUserDto, userData: Partial<UserEntity>) {
    return await this.userRepository.save({ ...User, ...userData });
  }
}
