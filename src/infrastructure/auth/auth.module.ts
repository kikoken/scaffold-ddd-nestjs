import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Staff } from '../schemas/staff.entity';
import { AuthController } from './auth.controller';
import { AuthInfrastructureService } from './auth.service';
import { AuthApplicationProvider } from './auth.application.provider';

@Module({
  imports: [
    TypeOrmModule.forFeature([Staff]),
    JwtModule.register({
      secret: 'your-secret-key', // In production, use environment variables
      signOptions: {
        expiresIn: '24h',
      },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthInfrastructureService,
    AuthApplicationProvider,
    {
      provide: 'IUserRepository',
      useClass: AuthInfrastructureService
    }
  ],
  exports: [AuthInfrastructureService]
})
export class AuthModule {}
