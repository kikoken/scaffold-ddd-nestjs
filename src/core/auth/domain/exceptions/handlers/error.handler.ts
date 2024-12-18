import { 
  InvalidCredentialsException 
} from '../invalid-credentials.exception';
import { 
  UserAlreadyExistsException 
} from '../user-already-exists.exception';
import { 
  UserNotFoundException 
} from '../user-not-found.exception';
import { 
  EmailAlreadyUsedException 
} from '../email-already-used.exception';
import { InvalidCredentialsStrategy } from '../strategies/InvalidCredentialsStrategy';
import { UserNotFoundStrategy } from '../strategies/UserNotFoundStrategy';
import { ConflictStrategy } from '../strategies/ConflictStrategy';
import { DefaultStrategy } from '../strategies/DefaultStrategy';

const errorStrategies = new Map([
  [InvalidCredentialsException, new InvalidCredentialsStrategy()],
  [UserNotFoundException, new UserNotFoundStrategy()],
  [UserAlreadyExistsException, new ConflictStrategy()],
  [EmailAlreadyUsedException, new ConflictStrategy()],
]);

export const handleAuthError = (error: Error): never => {
  const strategy = errorStrategies.get(error.constructor as any) || new DefaultStrategy();
  return strategy.handle(error);
};
