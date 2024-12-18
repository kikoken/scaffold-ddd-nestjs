import * as TaskEither from "fp-ts/TaskEither";
import { UserProps } from "../../domain/models/user.model";
import { AuthDomainService } from "../../domain/services/auth.domain.service";
import { handleAuthError } from "../../domain/exceptions/handlers/error.handler";
import { UserNotFoundException } from "../../domain/exceptions/user-not-found.exception";
import { EmailAlreadyUsedException } from "../../domain/exceptions/email-already-used.exception";

export interface UpdateUserDto {
  dni: string;
  updates: Partial<UserProps>;
}

export const updateUserUseCase = (
  authDomainService: AuthDomainService
) => {
  return (dto: UpdateUserDto): 
    TaskEither.TaskEither<
      UserNotFoundException | EmailAlreadyUsedException, 
      UserProps
    > => 
    TaskEither.tryCatch(
      () => authDomainService.update(dto.dni, dto.updates),
      handleAuthError
    );
};
