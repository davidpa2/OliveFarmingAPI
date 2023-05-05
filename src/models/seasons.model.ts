import {Entity, model, property} from '@loopback/repository';

@model()
export class Seasons extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
    required: true,
  })
  _id: string;

  @property({
    type: 'string',
    required: true,
  })
  seasonCode: string;

  @property({
    type: 'string',
    required: true,
  })
  seasonLiters: number;


  constructor(data?: Partial<Seasons>) {
    super(data);
  }
}

export interface SeasonsRelations {
  // describe navigational properties here
}

export type SeasonsWithRelations = Seasons & SeasonsRelations;
