import { ApiProperty } from '@nestjs/swagger';
import { LoginUserDto as DomainLoginUserDto } from '../../../core/auth/utils/validation';

export class LoginUserDto implements DomainLoginUserDto {
  @ApiProperty({
    example: '12345678',
    description: 'User DNI number'
  })
  dni: string;

  @ApiProperty({
    example: 'StrongP@ssw0rd',
    description: 'User password'
  })
  password: string;
}
