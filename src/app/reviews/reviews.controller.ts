import { Controller, Get, Param, Body, Post } from '@nestjs/common';
import { Review } from './review.model';
import { ReviewsService } from './reviews.service';

@Controller('api/reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Get(':id')
  list(@Param('id') id: string): Promise<Review | null> {
    return this.reviewsService.single(Number(id));
  }

  @Post()
  create(@Body() review: Review): Promise<Review> {
    return this.reviewsService.create(review);
  }
}
