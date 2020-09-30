import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AirportsConsole } from './aiports.console';
import { Airport } from './airport.model';
import { AirportsController } from './airports.controller';
import { AirportsService } from './airports.service';

@Module({
  imports: [SequelizeModule.forFeature([Airport])],
  controllers: [AirportsController],
  providers: [AirportsService, AirportsConsole],
})
export class AirportsModule {}
