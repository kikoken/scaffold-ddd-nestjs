import { z } from 'zod';
import * as Either from 'fp-ts/Either';
import { pipe } from 'fp-ts/function';

export const UserSchema = z.object({
  dni: z.string().min(8, "DNI must be at least 8 characters"),
  name: z.string().min(2, "Name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Invalid email format"),
  password: z.string()
    .min(8, "Password must be at least 8 characters")
    .transform(pwd => pwd.trim()),
  phone: z.string().min(6, "Phone must be at least 6 characters"),
  active: z.boolean().optional().default(true),
  validateAccount: z.date().nullable().default(null),
});

export type UserProps = z.infer<typeof UserSchema>;

const createUser = (props: UserProps): Either.Either<z.ZodError, UserProps> => 
    pipe(
      UserSchema.safeParse(props),
      (result) => result.success ? Either.right(result.data) : Either.left(result.error)
    );

const isAccountValidated = (user: UserProps): boolean => 
    user.validateAccount !== null;

const validateAccount = (user: UserProps): UserProps => 
    ({ ...user, validateAccount: new Date() });

const updateUserProperty = <K extends keyof UserProps>(
    user: UserProps, 
    key: K, 
    value: UserProps[K]
): UserProps => ({
    ...user,
    [key]: value
});

export default {
    create: createUser,
    isValidated: isAccountValidated,
    validate: validateAccount,
    update: updateUserProperty
};