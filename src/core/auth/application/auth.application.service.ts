import { AuthDomainService } from '../domain/services/auth.domain.service';
import { IUserRepository } from '../domain/interfaces/types';
import { loginUserUseCase } from './usecases/login.use-case';
import { registerUserUseCase } from './usecases/register.use-case';
import { updateUserUseCase } from './usecases/update.use-case';
import { LoginUserDto, RegisterUserDto } from '../utils/validation';
import { UpdateUserDto } from './usecases/update.use-case';
import * as TaskEither from 'fp-ts/TaskEither';
import { pipe } from 'fp-ts/function';
import { UserProps } from '../domain/models/user.model';
import { IAuthApplication } from '../domain/interfaces/auth.application.interface';

export class AuthApplicationService implements IAuthApplication {
  private readonly authDomainService: AuthDomainService;

  constructor(userRepository: IUserRepository) {
    this.authDomainService = new AuthDomainService(userRepository);
  }

  async login(dto: LoginUserDto): Promise<UserProps> {
    const loginUseCase = loginUserUseCase(this.authDomainService);
    const result = await pipe(
      loginUseCase(dto),
      TaskEither.fold(
        (error) => () => Promise.reject(error),
        (user) => () => Promise.resolve(user)
      )
    )();
    return result;
  }

  async register(dto: RegisterUserDto): Promise<UserProps> {
    const registerUseCase = registerUserUseCase(this.authDomainService);
    const result = await pipe(
      registerUseCase(dto),
      TaskEither.fold(
        (error) => () => Promise.reject(error),
        (user) => () => Promise.resolve(user)
      )
    )();
    return result;
  }

  async update(dto: UpdateUserDto): Promise<UserProps> {
    const updateUseCase = updateUserUseCase(this.authDomainService);
    const result = await pipe(
      updateUseCase(dto),
      TaskEither.fold(
        (error) => () => Promise.reject(error),
        (user) => () => Promise.resolve(user)
      )
    )();
    return result;
  }
}
