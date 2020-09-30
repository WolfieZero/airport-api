import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ReviewsConsole } from './reviews.console';
import { Review } from './review.model';
import { ReviewsController } from './reviews.controller';
import { ReviewsService } from './reviews.service';
import { Airport } from '@app/airports/airport.model';

@Module({
  imports: [SequelizeModule.forFeature([Review, Airport])],
  controllers: [ReviewsController],
  providers: [ReviewsService, ReviewsConsole],
})
export class ReviewsModule {}
