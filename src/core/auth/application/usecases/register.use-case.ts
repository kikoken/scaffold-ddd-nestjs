import { pipe } from "fp-ts/function";
import * as TaskEither from "fp-ts/TaskEither";
import { RegisterUserDto, validateRegisterInput } from "../../utils/validation";
import { handleAuthError } from "../../domain/exceptions/handlers/error.handler";
import { InvalidCredentialsException } from "../../domain/exceptions/invalid-credentials.exception";
import { UserAlreadyExistsException } from "../../domain/exceptions/user-already-exists.exception";
import { UserProps } from "../../domain/models/user.model";
import { AuthDomainService } from "../../domain/services/auth.domain.service";

export const registerUserUseCase = (
  authDomainService: AuthDomainService
) => {
  return (dto: RegisterUserDto): 
    TaskEither.TaskEither<
      UserAlreadyExistsException | InvalidCredentialsException, 
      UserProps
    > => 
    pipe(
      validateRegisterInput(dto),
      TaskEither.fromEither,
      TaskEither.chain(validDto => TaskEither.tryCatch(
          () => authDomainService.register(validDto),
          handleAuthError
        )
      )
    );
};