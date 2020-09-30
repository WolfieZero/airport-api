import { ApiProperty } from '@nestjs/swagger';

export class CreateReviewDto {
  @ApiProperty()
  name!: string;

  @ApiProperty()
  email!: string;

  @ApiProperty()
  rating!: number;

  @ApiProperty()
  body!: string;

  @ApiProperty()
  airportId!: number;
}
