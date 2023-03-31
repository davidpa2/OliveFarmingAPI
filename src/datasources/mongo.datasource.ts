import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';
import {config as conf} from 'dotenv';

conf();
const config = {
  name: 'mongodb',
  connector: 'mongodb',
  url: "",
  host: process.env.MONGODB_HOST,
  port: process.env.MONGODB_PORT,
  user: '',
  password: '',
  database: process.env.MONGODB_DATABASE,
  useNewUrlParser: true
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class MongoDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'mongo';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.mongo', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
