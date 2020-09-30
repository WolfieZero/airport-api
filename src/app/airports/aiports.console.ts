import { Console, Command, createSpinner } from 'nestjs-console';
import { AirportsService } from './airports.service';

type AirportRaw = {
  iata_code: string;
  type: string;
  continent: string;
  coordinates: string;
  elevation_ft: string;
  gps_code: string;
  ident: string;
  iso_country: string;
  iso_region: string;
  local_code: string;
  municipality: string;
  name: string;
};

@Console()
export class AirportsConsole {
  constructor(private readonly airportService: AirportsService) {}

  @Command({
    command: 'airports:download',
    description: 'Downloads the airport data file',
  })
  async download(): Promise<void> {
    const spinner = createSpinner();
    spinner.start('Downloading airports data');
    await this.airportService.download();
    spinner.succeed('Airports download done');
  }

  @Command({
    command: 'airports:refresh',
    description: 'Refreshes the airport data (will truncate current airport data)',
  })
  async refresh(): Promise<void> {
    const spinner = createSpinner();
    spinner.start('Refreshing airports data');
    await this.airportService.refresh();
    spinner.succeed('Airports refreshed');
  }
}
