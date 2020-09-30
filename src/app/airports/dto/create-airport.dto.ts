import { ApiProperty } from '@nestjs/swagger';

export class CreateAirportDto {
  @ApiProperty()
  name!: string;

  @ApiProperty()
  iataCode!: string;

  @ApiProperty()
  ident!: string;

  @ApiProperty()
  isoCountry!: string;

  @ApiProperty()
  municipality!: string;

  @ApiProperty()
  continent!: string;

  @ApiProperty()
  coordinates!: string;
}
