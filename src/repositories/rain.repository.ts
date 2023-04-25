import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongoDataSource} from '../datasources';
import {Rain, RainRelations} from '../models';

export class RainRepository extends DefaultCrudRepository<
  Rain,
  typeof Rain.prototype._id,
  RainRelations
> {
  constructor(
    @inject('datasources.mongodb') dataSource: MongoDataSource,
  ) {
    super(Rain, dataSource);
  }
}
