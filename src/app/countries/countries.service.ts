import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Country } from './country.model';
import { DEFAULT_LIMIT, COUNTRY_DATA_URL, COUNTRY_DATA_FILE } from '@config';
import { downloadFile } from '@lib/download-file';
import { CountryIdentifier, CountryRaw } from './country';

@Injectable()
export class CountriesService {
  constructor(
    @InjectModel(Country)
    private countryModel: typeof Country
  ) {}

  async list(page = 1): Promise<Country[]> {
    const limit = DEFAULT_LIMIT;
    const offset = (page - 1) * limit || 0;
    return this.countryModel.findAll({
      limit,
      offset,
    });
  }

  async single(identifier: CountryIdentifier): Promise<Country> {
    return this.countryModel.findByIdentifier(identifier);
  }

  async download(): Promise<void> {
    return downloadFile(COUNTRY_DATA_URL, COUNTRY_DATA_FILE);
  }

  async refresh(): Promise<void> {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const countries: CountryRaw[] = require(COUNTRY_DATA_FILE);

    await this.countryModel.truncate();

    const addCountry = async (country: CountryRaw): Promise<Country | null> => {
      let refreshedCountry = null;
      try {
        refreshedCountry = await this.countryModel.create({
          name: country['CLDR display name'],
          code: country['ISO3166-1-Alpha-2'],
          code3: country['ISO3166-1-Alpha-3'],
          region: country['Region Name'],
          subReigion: country['Sub-region Name'],
        });
      } catch (error) {
        console.error(error);
      }
      return refreshedCountry;
    };

    for (let i = 0; countries.length > i; i++) {
      await addCountry(countries[i]);
    }
  }
}
