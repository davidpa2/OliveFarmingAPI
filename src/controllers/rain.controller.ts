// Uncomment these imports to begin using these cool features!

import {uuid} from '@loopback/core';
import {Filter, repository} from '@loopback/repository';
import {del, get, getModelSchemaRef, param, post, requestBody, response} from '@loopback/rest';
import {Rain} from '../models';
import {RainRepository} from '../repositories';
import {CreateRain} from './specs/rain.controller.specs';

// import {inject} from '@loopback/core';


export class RainController {
  constructor(
    @repository(RainRepository) protected rainRepository: RainRepository,
  ) { }

  @get('/rain')
  @response(200, {
    description: 'Array of Rain model instances',
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


  @get('/rain/season/{season}')
  @response(200, {
    description: 'Array of Rain model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Rain, {includeRelations: true}),
        },
      },
    },
  })
  async findBySeason(
    @param.path.string('season') season: string,
  ): Promise<Rain[]> {
    return this.rainRepository.find({where: {season}});
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
          schema: getModelSchemaRef(CreateRain, {
            title: 'NewRainLog',
          }),
        },
      },
    })
    rain: CreateRain,
  ): Promise<Rain> {
    return this.rainRepository.create(
      {_id: uuid(), date: rain.date, liters: rain.liters, season: rain.season}
    );
  }

  @del('/rain/{id}')
  @response(204, {
    description: 'Rain DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<object> {
    const rainLog = await this.rainRepository.findOne({where: {_id: id}})
    await this.rainRepository.delete(rainLog!);
    return {description: 'Rain DELETE success'};
  }
}
