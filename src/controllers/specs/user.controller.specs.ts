import {model, property} from '@loopback/repository';

@model()
export class JwtResponse {
  @property({
    type: 'string',
    required: true,
  })
  jwt: string;
}

@model()
export class LoginDTO {
  @property({
    type: 'string',
    required: true
  })
  email: string

  @property({
    type: 'string',
    required: true
  })
  password: string
}
