import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { v4 as uid } from 'uuid';

@Entity()
export class UserEntity {
  @ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'username', description: 'Имя пользователя' })
  @Column()
  username: string;

  @ApiProperty({ example: '12345678', description: 'Пароль' })
  @Column()
  password: string;

  @ApiProperty({ example: false, description: 'Заблокирован или нет' })
  @Column({ default: false })
  banned: boolean;

  @ApiProperty({ example: uid(), description: 'Рефреш токен' })
  @Column()
  refreshToken: string;
}
