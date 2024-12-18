import * as bcrypt from 'bcryptjs';
import * as TaskEither from 'fp-ts/TaskEither';

const SALT_ROUNDS = 10;

/**
 * Hash a password using bcrypt
 * @param password Plain text password to hash
 * @returns Promise with the hashed password
 */
export const hashPassword = async (password: string): Promise<string> => {
  try {
    // Ensure the password is a string and trim it
    const cleanPassword = String(password).trim();
    
    // Generate salt and hash
    const salt = await bcrypt.genSalt(SALT_ROUNDS);
    const hash = await bcrypt.hash(cleanPassword, salt);
    
    return hash;
  } catch (error) {
    throw new Error('Error hashing password');
  }
};

/**
 * Compare a plain text password with a hashed password
 * @param plainPassword Plain text password to compare
 * @param hashedPassword Hashed password to compare against
 * @returns Promise<boolean> indicating if passwords match
 */
export const comparePassword = async (
  plainPassword: string,
  hashedPassword: string
): Promise<boolean> => {
  try {
    // Ensure inputs are strings and trim the plain password
    const cleanPlainPassword = String(plainPassword).trim();
    const cleanHashedPassword = String(hashedPassword);

    // Verify the hashed password has the correct format (accepts $2a$, $2b$, or $2y$ prefixes)
    if (!cleanHashedPassword.match(/^\$2[aby]\$\d{1,2}\$/)) {
      return false;
    }

    // Compare passwords
    return await bcrypt.compare(cleanPlainPassword, cleanHashedPassword);
  } catch (error) {
    return false;
  }
};

export const hashPasswordTE = (password: string): TaskEither.TaskEither<Error, string> =>
  TaskEither.tryCatch(
    () => hashPassword(password),
    (error) => new Error(`Error hashing password: ${error}`)
  );

export const comparePasswordTE = (
  plainPassword: string,
  hashedPassword: string
): TaskEither.TaskEither<Error, boolean> =>
  TaskEither.tryCatch(
    () => comparePassword(plainPassword, hashedPassword),
    (error) => new Error(`Error comparing passwords: ${error}`)
  );
