import {model, property} from '@loopback/repository';
import {SchemaObject} from '@loopback/rest';

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

@model()
export class UserMe {
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
  name: string;

  @property({
    type: 'string',
    required: true,
  })
  surname: string;

  @property({
    type: 'string',
    required: true,
  })
  email: string;
}

const CredentialsSchema: SchemaObject = {
  type: 'object',
  required: ['email', 'password'],
  properties: {
    email: {
      type: 'string',
      format: 'email',
    },
    password: {
      type: 'string',
      minLength: 1,
    },
  },
};

export const CredentialsRequestBody = {
  description: 'The input of login function',
  required: true,
  content: {
    'application/json': {schema: CredentialsSchema},
  },
};
