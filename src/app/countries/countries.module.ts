import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { CountriesConsole } from './countries.console';
import { Country } from './country.model';
import { CountriesController } from './countries.controller';
import { CountriesService } from './countries.service';

@Module({
  imports: [SequelizeModule.forFeature([Country])],
  controllers: [CountriesController],
  providers: [CountriesService, CountriesConsole],
})
export class CountriesModule {}
