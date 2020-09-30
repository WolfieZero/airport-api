import { ApiProperty } from '@nestjs/swagger';

export class UpdateAirportDto {
  @ApiProperty({ required: false })
  name!: string;

  @ApiProperty({ required: false })
  iataCode!: string;

  @ApiProperty({ required: false })
  ident!: string;

  @ApiProperty({ required: false })
  isoCountry!: string;

  @ApiProperty({ required: false })
  municipality!: string;

  @ApiProperty({ required: false })
  continent!: string;

  @ApiProperty({ required: false })
  coordinates!: string;
}
