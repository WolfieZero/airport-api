import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { resolve } from 'path';

const SQLITE_FILE = resolve(__dirname, '../../data/airports.db');

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'sqlite',
      storage: SQLITE_FILE,
      logging: false,
    }),
  ],
})
export class DatabaseModule {}
