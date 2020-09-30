import { Console, Command, createSpinner } from 'nestjs-console';
import { CountriesService } from './countries.service';

@Console()
export class CountriesConsole {
  constructor(private readonly countriesService: CountriesService) {}

  @Command({
    command: 'countries:download',
    description: 'Downloads the country data file',
  })
  async download(): Promise<void> {
    const spinner = createSpinner();
    spinner.start('Downloading countries data');
    await this.countriesService.download();
    spinner.succeed('Countries download done');
  }

  @Command({
    command: 'countries:refresh',
    description: 'Refreshes the country data (will truncate current country data)',
  })
  async refresh(): Promise<void> {
    const spinner = createSpinner();
    spinner.start('Refreshing countries data');
    await this.countriesService.refresh();
    spinner.succeed('Countries refreshed');
  }
}
