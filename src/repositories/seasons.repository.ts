import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongoDataSource} from '../datasources';
import {Seasons, SeasonsRelations} from '../models';

export class SeasonsRepository extends DefaultCrudRepository<
  Seasons,
  typeof Seasons.prototype._id,
  SeasonsRelations
> {
  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource,
  ) {
    super(Seasons, dataSource);
  }
}
