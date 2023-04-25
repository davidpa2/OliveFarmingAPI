import {Entity, model, property} from '@loopback/repository';

@model()
export class Rain extends Entity {
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
  season: string;

  @property({
    type: 'date',
    required: true,
  })
  date: string;

  @property({
    type: 'number',
    required: true,
  })
  liters: number;


  constructor(data?: Partial<Rain>) {
    super(data);
  }
}

export interface RainRelations {
  // describe navigational properties here
}

export type RainWithRelations = Rain & RainRelations;
