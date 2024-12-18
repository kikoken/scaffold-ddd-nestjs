import { Injectable } from '@nestjs/common';
import { AuthApplicationService } from '../../core/auth/application/auth.application.service';
import { AuthInfrastructureService } from './auth.service';
import { LoginUserDto, RegisterUserDto } from '../../core/auth/utils/validation';
import { UpdateUserDto } from '../../core/auth/application/usecases/update.use-case';
import { UserProps } from '../../core/auth/domain/models/user.model';
import { IAuthApplication } from '../../core/auth/domain/interfaces/auth.application.interface';

@Injectable()
export class AuthApplicationProvider implements IAuthApplication {
  private readonly authApplicationService: AuthApplicationService;

  constructor(private readonly authRepository: AuthInfrastructureService) {
    this.authApplicationService = new AuthApplicationService(this.authRepository);
  }

  async login(loginDto: LoginUserDto): Promise<UserProps> {
    return this.authApplicationService.login(loginDto);
  }

  async register(registerDto: RegisterUserDto): Promise<UserProps> {
    return this.authApplicationService.register(registerDto);
  }

  async update(dto: UpdateUserDto): Promise<UserProps> {
    return this.authApplicationService.update(dto);
  }
}
