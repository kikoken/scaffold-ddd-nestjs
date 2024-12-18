import { z } from "zod";
import * as Either from "fp-ts/Either";
import { InvalidCredentialsException } from "../domain/exceptions/invalid-credentials.exception";
import { UserSchema } from "../domain/models/user.model";

export const RegisterUserDto = UserSchema.pick({
  dni: true,
  name: true,
  lastName: true,
  email: true,
  phone: true,
  password: true
});


export type RegisterUserDto = z.infer<typeof RegisterUserDto>;

export const LoginSchema = z.object({
  dni: z.string().min(8, "DNI must be at least 8 characters"),
  password: z.string()
    .min(8, "Password must be at least 8 characters")
    .transform(pwd => pwd.trim())
});

export type LoginUserDto = z.infer<typeof LoginSchema>;

export const validateRegisterInput = (
  dto: RegisterUserDto
): Either.Either<InvalidCredentialsException, RegisterUserDto> => {
  const result = RegisterUserDto.safeParse(dto);
  return result.success 
    ? Either.right(result.data)
    : Either.left(new InvalidCredentialsException(
        result.error.errors.map(err => err.message).join(", ")
      ));
};

export const validateLoginInput = (
  dto: LoginUserDto
): Either.Either<InvalidCredentialsException, LoginUserDto> => {
  const result = LoginSchema.safeParse(dto);
  return result.success 
    ? Either.right(result.data)
    : Either.left(new InvalidCredentialsException(
        result.error.errors.map(err => err.message).join(", ")
      ));
};
