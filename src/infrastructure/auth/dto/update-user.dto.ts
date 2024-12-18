import { ApiProperty } from '@nestjs/swagger';
import { UpdateUserDto as DomainUpdateUserDto } from '../../../core/auth/application/usecases/update.use-case';

export class UpdateUserDto implements DomainUpdateUserDto {
  @ApiProperty({
    example: '12345678',
    description: 'User DNI number'
  })
  dni: string;

  @ApiProperty({
    example: {
      name: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      phone: '+1234567890'
    },
    description: 'Fields to update'
  })
  updates: {
    name?: string;
    lastName?: string;
    email?: string;
    phone?: string;
  };
}
