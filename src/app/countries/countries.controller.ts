import { Controller, Get, Param, Query } from '@nestjs/common';
import { CountryIdentifier } from './country';
import { Country } from './country.model';
import { CountriesService } from './countries.service';

@Controller('api/countries')
export class CountriesController {
  constructor(private readonly countriesService: CountriesService) {}

  @Get()
  list(@Query('page') page: string): Promise<Country[]> {
    return this.countriesService.list(Number(page));
  }

  @Get(':identifier')
  single(@Param('identifier') identifier: CountryIdentifier): Promise<Country> {
    return this.countriesService.single(identifier);
  }
}
