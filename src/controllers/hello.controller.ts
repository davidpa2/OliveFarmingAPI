// Uncomment these imports to begin using these cool features!
import {inject} from '@loopback/core';
import {get, Request, response, ResponseObject, RestBindings} from '@loopback/rest';

/**
 * OpenAPI response for ping()
 */
const HELLO_RESPONSE: ResponseObject = {
  description: 'Hello Response',
  content: {
    'application/json': {
      schema: {
        type: 'object',
        title: 'HelloResponse',
        properties: {
          greeting: {hello: 'string'}
        },
      },
    },
  },
};

export class HelloController {
  constructor(@inject(RestBindings.Http.REQUEST) private req: Request) { }

  @get('/hello')
  @response(200, HELLO_RESPONSE)
  hello(): string {
    return 'Huuulaaa';
  }
}
