// Uncomment these imports to begin using these cool features!

import {Filter, repository} from '@loopback/repository';
import {get, getModelSchemaRef, param, post, requestBody, response} from '@loopback/rest';
import {Rain} from '../models';
import {RainRepository} from '../repositories';

// import {inject} from '@loopback/core';


export class RainController {
  constructor(
    @repository(RainRepository) protected rainRepository: RainRepository,
  ) { }

  @get('/rain')
  @response(200, {
    description: 'Array of User model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Rain, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Rain) filter?: Filter<Rain>,
  ): Promise<Rain[]> {
    return this.rainRepository.find(filter);
  }

  @post('/rain')
  @response(200, {
    description: 'Rain model instance',
    content: {'application/json': {schema: getModelSchemaRef(Rain)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Rain, {
            title: 'New rain log',
          }),
        },
      },
    })
    rain: Rain,
  ): Promise<Rain> {
    return this.rainRepository.create(rain);
  }
}
