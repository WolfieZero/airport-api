import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { AirportIdentifier } from './airport';
import { Airport } from './airport.model';
import { AirportsService } from './airports.service';

@Controller('api/airports')
export class AirportsController {
  constructor(private readonly airportService: AirportsService) {}

  @Get()
  list(@Query('page') page: string, @Query('reviews') reviews: string): Promise<Airport[]> {
    const includeReviews = Number(reviews) === 1 ? true : false;
    return this.airportService.list(Number(page), includeReviews);
  }

  @Get(':identifier')
  single(@Param('identifier') identifier: AirportIdentifier, @Query('reviews') reviews: string): Promise<Airport> {
    const includeReviews = Number(reviews) === 1 ? true : false;
    return this.airportService.single(identifier, includeReviews);
  }

  @Post()
  create(@Body() airport: Airport): Promise<Airport> {
    return this.airportService.create(airport);
  }

  @Put(':identifier')
  update(@Param('identifier') identifier: AirportIdentifier, @Body() airport: Airport): Promise<Airport> {
    return this.airportService.update(identifier, airport);
  }
}
