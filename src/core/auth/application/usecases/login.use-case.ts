import * as TaskEither from "fp-ts/TaskEither";
import { pipe } from "fp-ts/function";
import { InvalidCredentialsException } from "../../domain/exceptions/invalid-credentials.exception";
import { UserProps } from "../../domain/models/user.model";
import { AuthDomainService } from "../../domain/services/auth.domain.service";
import { validateLoginInput, LoginUserDto } from "../../utils/validation";
import { handleAuthError } from "../../domain/exceptions/handlers/error.handler";

export const loginUserUseCase = (
  authDomainService: AuthDomainService
) => {
  return (dto: LoginUserDto): TaskEither.TaskEither<InvalidCredentialsException, UserProps> =>
    pipe(
      validateLoginInput(dto),
      TaskEither.fromEither,
      TaskEither.chain(validDto =>
        TaskEither.tryCatch(
          () => authDomainService.login(validDto),
          handleAuthError
        )
      )
    );
};
