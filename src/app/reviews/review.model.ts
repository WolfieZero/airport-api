import { Airport } from '@app/airports/airport.model';
import { Column, DataType, Model, Table, BelongsTo, ForeignKey } from 'sequelize-typescript';

@Table
export class Review extends Model<Review> {
  @Column(DataType.STRING)
  name!: string;

  @Column(DataType.STRING)
  email!: string;

  @Column(DataType.INTEGER)
  rating!: number;

  @Column(DataType.TEXT)
  body?: string;

  @ForeignKey(() => Airport)
  @Column
  airportId!: number;

  @BelongsTo(() => Airport)
  airport!: Airport;
}
