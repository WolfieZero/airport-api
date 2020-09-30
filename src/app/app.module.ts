import { Module } from '@nestjs/common';
// import { DatabaseModule } from './database';
import { AirportsModule } from './airports';
import { CountriesModule } from './countries';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConsoleModule } from 'nestjs-console';
import { SQLITE_FILE } from '@config';
import { ReviewsModule } from './reviews';

const database = SequelizeModule.forRoot({
  dialect: 'sqlite',
  storage: SQLITE_FILE,
  logging: false,
  autoLoadModels: true,
  synchronize: true,
});

@Module({
  imports: [database, ConsoleModule, AirportsModule, CountriesModule, ReviewsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
