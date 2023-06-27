import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongoDataSource} from '../datasources';
import {User} from '../models';

export type Credentials = {
  email: string;
  password: string;
};

export class UserRepository extends DefaultCrudRepository<
  User,
  typeof User.prototype._id
// ,UserRelations
> {
  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource,
    // @inject('datasources.mongo') dataSource: juggler.DataSource,
  ) {
    super(User, dataSource);
  }
}
