import { Airport } from '@app/airports/airport.model';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Review } from './review.model';
import { NUMBER_OF_GENERATE_REVIEWS } from '@config';
import { name, internet, lorem } from 'faker';
import { CreateReviewDto } from './dto';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectModel(Review)
    private reviewModel: typeof Review,
    @InjectModel(Airport)
    private airportModel: typeof Airport
  ) {}

  async single(id: number): Promise<Review | null> {
    return this.reviewModel.findByPk(id);
  }

  async create(createReviewDto: CreateReviewDto): Promise<Review> {
    const createdReview = this.reviewModel.create(createReviewDto);
    return createdReview;
  }

  async fakeIt(): Promise<void> {
    const busyAirports = await this.airportModel.findBusyAirports();

    this.reviewModel.truncate();

    for (let i = 0; i < NUMBER_OF_GENERATE_REVIEWS; i++) {
      const airportId: number = busyAirports[Math.floor(Math.random() * busyAirports.length)].id;
      try {
        await this.reviewModel.create({
          name: name.findName(),
          email: internet.email(),
          rating: Math.floor(Math.random() * 5 + 1),
          body: lorem.paragraphs(),
          airportId,
        });
      } catch (error) {
        console.error(error);
      }
    }
  }
}
