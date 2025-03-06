import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {UsersModule} from "../user/users.module";
import {AuthModule} from "../auth/auth.module";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const dbConfig = require('../../../ormconfig');

@Module({
  imports: [
    TypeOrmModule.forRoot(dbConfig),
      UsersModule,
      AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
