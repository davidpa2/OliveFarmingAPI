import {model, property} from '@loopback/repository';

@model()
export class CreateRain {
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
}


@model()
export class SeasonLitersResponse {
  @property({
    type: 'number',
    required: true,
  })
  liters: number
}
