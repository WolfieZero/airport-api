import { Review } from '@app/reviews/review.model';
import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { FindOptions, Op } from 'sequelize';
import { WhereOptions } from 'sequelize/types';
import { AirportIdentifier } from './airport';
import { BUSY_AIRPORTS } from '@config';
import { option } from 'commander';

@Table
export class Airport extends Model<Airport> {
  @Column
  name!: string;

  @Column(DataType.CHAR(3))
  iataCode!: string;

  @Column(DataType.CHAR(4))
  ident!: string;

  @Column(DataType.CHAR(2))
  isoCountry?: string;

  @Column(DataType.TEXT)
  municipality!: string;

  @Column(DataType.CHAR(2))
  continent!: string;

  @Column(DataType.TEXT)
  coordinates!: string;

  @HasMany(() => Review)
  reviews?: Review[];

  static findByIdentifier(identifier: AirportIdentifier, options?: FindOptions): Promise<Airport> {
    if (Number(identifier) > 0) {
      return this.findByPk(identifier, options);
    }

    const where: WhereOptions = {};

    identifier = String(identifier);
    switch (identifier.length) {
      case 3:
        where.iataCode = identifier.toUpperCase();
        break;
      case 4:
        where.ident = identifier.toUpperCase();
        break;
      default:
        throw new Error('No valid identifier given (id, iataCode, ident)');
    }

    return this.findOne({ ...options, where });
  }

  static findBusyAirports(): Promise<Airport[]> {
    return this.findAll({
      where: {
        iataCode: {
          [Op.or]: BUSY_AIRPORTS,
        },
      },
    });
  }
}
