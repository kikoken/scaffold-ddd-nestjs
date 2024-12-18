import { UserProps } from "../models/user.model";
import { LoginUserDto, RegisterUserDto } from "../../utils/validation";
import { UpdateUserDto } from "../../application/usecases/update.use-case";

export interface IAuthApplication {
  login(dto: LoginUserDto): Promise<UserProps>;
  register(dto: RegisterUserDto): Promise<UserProps>;
  update(dto: UpdateUserDto): Promise<UserProps>;
}
