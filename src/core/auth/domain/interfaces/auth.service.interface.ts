import { UserProps } from "../models/user.model";
import { LoginUserDto } from "../../utils/validation";

export interface IAuthService {
  register(userProps: UserProps): Promise<UserProps>;
  login(credentials: LoginUserDto): Promise<UserProps>;
  update(dni: string, updates: Partial<UserProps>): Promise<UserProps>;
}
