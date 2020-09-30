import { Console, Command, createSpinner } from 'nestjs-console';
import { ReviewsService } from './reviews.service';

@Console()
export class ReviewsConsole {
  constructor(private readonly reivewsService: ReviewsService) {}

  @Command({
    command: 'reviews:refresh',
    description: 'Refreshes the review data (will truncate current review data and replace it with fake data)',
  })
  async refresh(): Promise<void> {
    const spinner = createSpinner();
    spinner.start('Refreshing reviews data');
    await this.reivewsService.fakeIt();
    spinner.succeed('Reviews refreshed');
  }
}
