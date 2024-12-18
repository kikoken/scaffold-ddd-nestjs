import { JwtService } from '@nestjs/jwt';
import { UserProps } from '../../core/auth/domain/models/user.model';

export const generateToken = (jwtService: JwtService, user: UserProps): string => {
    return jwtService.sign({ 
        sub: user.dni,
        email: user.email
    });
};
