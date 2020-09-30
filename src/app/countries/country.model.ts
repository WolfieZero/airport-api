import { Column, DataType, Model, Table } from 'sequelize-typescript';
import { WhereOptions } from 'sequelize/types';
import { CountryIdentifier } from './country';

@Table
export class Country extends Model<Country> {
  @Column(DataType.STRING)
  name!: string;

  @Column(DataType.CHAR(2))
  code!: string;

  @Column(DataType.CHAR(3))
  code3!: string;

  @Column(DataType.TEXT)
  region?: string;

  @Column(DataType.TEXT)
  subReigion?: string;

  static findByIdentifier(identifier: CountryIdentifier): Promise<Country> {
    if (Number(identifier) > 0) {
      return this.findByPk(Number(identifier));
    }

    const where: WhereOptions = {};

    identifier = String(identifier);
    switch (identifier.length) {
      case 2:
        where.code = identifier.toUpperCase();
        break;
      case 3:
        where.code3 = identifier.toUpperCase();
        break;
      default:
        throw new Error('No valid identifier given (id, code, code3)');
    }

    return this.findOne({ where });
  }
}
