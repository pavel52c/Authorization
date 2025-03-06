import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';
import { v4 as uid } from 'uuid';

export class CreateUserDto {
  @ApiProperty({ example: 'Cat', description: 'Имя пользователя' })
  @IsString({ message: 'Должно быть строкой' })
  readonly username: string;

  @ApiProperty({ example: '12345', description: 'Пароль' })
  @IsString({ message: 'Должно быть строкой' })
  @Length(4, 16, { message: 'Не меньше 4 и не больше 16' })
  readonly password: string;

  @ApiProperty({ example: uid(), description: 'Рефреш токен' })
  readonly refreshToken: string;
}
