import {model, property} from '@loopback/repository';

@model()
export class CreateSeasonSchema {
  @property({
    type: 'string',
    required: true,
  })
  seasonCode: string;
}
