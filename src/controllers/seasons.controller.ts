import {uuid} from '@loopback/core';
import {
  Count,
  CountSchema,
  repository,
  Where
} from '@loopback/repository';
import {
  get,
  getModelSchemaRef,
  param,
  post,
  requestBody,
  response
} from '@loopback/rest';
import {Seasons} from '../models';
import {SeasonsRepository} from '../repositories';
import {CreateSeasonSchema} from './specs/seasons.controller.spects';

export class SeasonsController {
  constructor(
    @repository(SeasonsRepository)
    public seasonsRepository: SeasonsRepository,
  ) { }

  @post('/seasons')
  @response(200, {
    description: 'Seasons model instance',
    content: {'application/json': {schema: getModelSchemaRef(Seasons)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CreateSeasonSchema),
        },
      },
    })
    params: CreateSeasonSchema,
  ): Promise<Seasons> {
    return this.seasonsRepository.create(new Seasons({_id: uuid(), seasonCode: params.seasonCode}));
  }

  @get('/seasons/count')
  @response(200, {
    description: 'Seasons model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Seasons) where?: Where<Seasons>,
  ): Promise<Count> {
    return this.seasonsRepository.count(where);
  }

  @get('/seasons')
  @response(200, {
    description: 'Array of Seasons model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          properties: {type: 'string'},
          example: ["22/23"]
        },
      },
    },
  })
  async find(): Promise<string[]> {
    const seasonsInstances = await this.seasonsRepository.find({order: ['seasonCode', 'ASC']});
    const seasons: string[] = [];
    seasonsInstances.forEach(season => {
      seasons.push(season.seasonCode);
    });
    return seasons;
  }
}
