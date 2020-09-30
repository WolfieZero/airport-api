import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  Param,
  ParseBoolPipe,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { AirportIdentifier } from './airport';
import { Airport } from './airport.model';
import { AirportsService } from './airports.service';
import { CreateAirportDto, UpdateAirportDto } from './dto';

@Controller('api/airports')
export class AirportsController {
  constructor(private readonly airportService: AirportsService) {}

  @Get()
  list(
    @Query('page', new DefaultValuePipe(0), ParseIntPipe) page: string,
    @Query('reviews', new DefaultValuePipe(false), ParseBoolPipe) includeReviews: boolean
  ): Promise<Airport[]> {
    return this.airportService.list(Number(page), includeReviews);
  }

  @Get(':identifier')
  single(
    @Param('identifier') identifier: AirportIdentifier,
    @Query('reviews', new DefaultValuePipe(false), ParseBoolPipe) includeReviews: boolean
  ): Promise<Airport> {
    return this.airportService.single(identifier, includeReviews);
  }

  @Post()
  create(@Body() createAirportDto: CreateAirportDto): Promise<Airport> {
    return this.airportService.create(createAirportDto);
  }

  @Put(':identifier')
  update(
    @Param('identifier') identifier: AirportIdentifier,
    @Body() updateAirportDto: UpdateAirportDto
  ): Promise<Airport> {
    return this.airportService.update(identifier, updateAirportDto);
  }
}
