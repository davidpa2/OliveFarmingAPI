import {authenticate, TokenService, UserService} from '@loopback/authentication';
import {TokenServiceBindings} from '@loopback/authentication-jwt';
import {inject} from '@loopback/core';
import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  param,
  patch,
  post,
  put,
  Request,
  requestBody,
  Response,
  response,
  RestBindings
} from '@loopback/rest';
import {UserServiceBindings} from '../keys';
import {User, User as UserModel} from '../models';
import {Credentials, UserRepository} from '../repositories';
import {CredentialsRequestBody, UserMe} from './specs/user.controller.specs';

export class UserController {
  constructor(
    @inject(TokenServiceBindings.TOKEN_SERVICE) public jwtService: TokenService,
    @inject(UserServiceBindings.USER_SERVICE) public userService: UserService<User, Credentials>,
    // @inject(SecurityBindings.USER, {optional: true}) public user: UserProfile,
    @repository(UserRepository) protected userRepository: UserRepository,
    // @repository(UserRepositoryJWT) protected userRepositoryJWT: UserRepositoryJWT,
    @inject(RestBindings.Http.RESPONSE) private res: Response,
    @inject(RestBindings.Http.REQUEST) private request: Request,
  ) { }

  @post('/users/login', {
    responses: {
      '200': {
        description: 'Token',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                token: {
                  type: 'string',
                },
              },
            },
          },
        },
      },
    },
  })
  async login(
    // user: LoginDTO
    @requestBody(CredentialsRequestBody) credentials: Credentials,
    // ): Promise<JwtResponse | Record<string, any>> {
  ): Promise<{token: string}> {
    console.log(credentials);
    const validatedUser = await this.userService.verifyCredentials(credentials);
    const userProfile = this.userService.convertToUserProfile(validatedUser);
    const token = await this.jwtService.generateToken(userProfile);
    return {token};

    // const existingUserByEmail = await this.userRepository.findOne({where: {email: user.email}});
    // if (!existingUserByEmail) return this.res.status(401).send({errors: ['Credenciales incorrectass']});

    // const checkPassword = user.password === existingUserByEmail.password;
    // if (!checkPassword) return this.res.status(401).send({errors: ['Credenciales incorrectas']});

    // const jwtConstructor = new SignJWT({id: existingUserByEmail._id},);
    // const encoder = new TextEncoder();
    // console.log(encoder.encode(process.env.JWT_PRIVATE_KEY));

    // const jwt = await jwtConstructor.setProtectedHeader({
    //   alg: 'HS256', typ: 'JWT'
    // }).setIssuedAt().setExpirationTime('7d').sign(encoder.encode(process.env.JWT_PRIVATE_KEY));
    // return {jwt};
  }


  @get('/users/me')
  @authenticate('jwt')
  @response(200, {
    description: 'User data',
    content: {'application/json': {schema: UserMe}},
  })
  async me(): Promise<string> {
    console.log(this.request.headers);
    return 'jajaj';
  }


  @post('/users')
  @response(200, {
    description: 'User model instance',
    content: {'application/json': {schema: getModelSchemaRef(User)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(User, {
            title: 'NewUser',
          }),
        },
      },
    })
    user: User,
  ): Promise<UserModel> {
    return this.userRepository.create(user);
  }


  @get('/users/count')
  @response(200, {
    description: 'User model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(User) where?: Where<User>,
  ): Promise<Count> {
    return this.userRepository.count(where);
  }


  @get('/users')
  @response(200, {
    description: 'Array of User model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(User, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(User) filter?: Filter<UserModel>,
  ): Promise<UserModel[]> {
    return this.userRepository.find(filter);
  }


  @patch('/users')
  @response(200, {
    description: 'User PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(User, {partial: true}),
        },
      },
    })
    user: User,
    @param.where(User) where?: Where<User>,
  ): Promise<Count> {
    return this.userRepository.updateAll(user, where);
  }


  @get('/users/{id}')
  @response(200, {
    description: 'User model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(User, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(User, {exclude: 'where'}) filter?: FilterExcludingWhere<UserModel>
  ): Promise<UserModel> {
    return this.userRepository.findById(id, filter);
  }


  @patch('/users/{id}')
  @response(204, {
    description: 'User PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(User, {partial: true}),
        },
      },
    })
    user: User,
  ): Promise<void> {
    await this.userRepository.updateById(id, user);
  }


  @put('/users/{id}')
  @response(204, {
    description: 'User PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() user: User,
  ): Promise<void> {
    await this.userRepository.replaceById(id, user);
  }


  @del('/users/{id}')
  @response(204, {
    description: 'User DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.userRepository.deleteById(id);
  }
}
