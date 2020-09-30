import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { AirportIdentifier, AirportRaw } from './airport';
import { Airport } from './airport.model';
import { AIRPORT_DATA_URL, AIRPORT_DATA_FILE, DEFAULT_LIMIT } from '@config';
import { downloadFile } from '@lib/download-file';
import { Review } from '@app/reviews/review.model';
import { CreateAirportDto, UpdateAirportDto } from './dto';

@Injectable()
export class AirportsService {
  constructor(
    @InjectModel(Airport)
    private airportModel: typeof Airport
  ) {}

  async list(page: number, inlcudeReviews = false): Promise<Airport[]> {
    const limit = DEFAULT_LIMIT;
    const offset = (page - 1) * limit || 0;
    const include = [];
    inlcudeReviews && include.push(Review);
    return this.airportModel.findAll({
      limit,
      offset,
      include,
    });
  }

  async single(identifier: AirportIdentifier, inlcudeReviews = false): Promise<Airport> {
    const include = [];
    inlcudeReviews && include.push(Review);
    const airport = await this.airportModel.findByIdentifier(identifier, { include });
    return airport;
  }

  async create(createAirportDto: CreateAirportDto): Promise<Airport> {
    return this.airportModel.create(createAirportDto);
  }

  async update(identifier: AirportIdentifier, updateAirportDto: UpdateAirportDto): Promise<Airport> {
    const airport = await this.airportModel.findByIdentifier(identifier);
    return airport.update(updateAirportDto);
  }

  async download(): Promise<void> {
    return downloadFile(AIRPORT_DATA_URL, AIRPORT_DATA_FILE);
  }

  async refresh(): Promise<void> {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const airports: AirportRaw[] = require(AIRPORT_DATA_FILE);

    await this.airportModel.truncate();

    const addAirport = async (airport: AirportRaw): Promise<Airport | null> => {
      if (airport.iata_code?.length === 3 && airport.type === 'large_airport') {
        let refreshedAirport = null;
        try {
          refreshedAirport = await this.airportModel.create({
            name: airport.name,
            iataCode: airport.iata_code,
            ident: airport.ident,
            isoCountry: airport.iso_country,
            continent: airport.continent,
            coordinates: airport.coordinates,
          });
        } catch (error) {
          console.error(error);
        }
        return refreshedAirport;
      }
      return null;
    };

    for (let i = 0; airports.length > i; i++) {
      await addAirport(airports[i]);
    }
  }
}
