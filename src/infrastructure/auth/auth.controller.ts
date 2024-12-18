import { Body, Controller, HttpCode, HttpStatus, Post, Put, Param } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { generateToken } from '../../shared/utils/token.utils';
import { handleAuthError } from '../../core/auth/domain/exceptions/handlers/error.handler';
import { AuthApplicationProvider } from './auth.application.provider';
import { UserProps } from '../../core/auth/domain/models/user.model';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { LoginUserDto } from './dto/login-user.dto';
import { RegisterUserDto } from './dto/register-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authApplicationProvider: AuthApplicationProvider,
    private readonly jwtService: JwtService
  ) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Register a new user' })
  @ApiBody({ type: RegisterUserDto })
  @ApiResponse({ 
    status: HttpStatus.CREATED, 
    description: 'User successfully registered',
    schema: {
      properties: {
        message: { type: 'string', example: 'User registered successfully' },
        user: {
          type: 'object',
          properties: {
            dni: { type: 'string', example: '12345678' },
            email: { type: 'string', example: 'user@example.com' },
            name: { type: 'string', example: 'John Doe' }
          }
        }
      }
    }
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Invalid input data' })
  @ApiResponse({ status: HttpStatus.CONFLICT, description: 'User already exists' })
  async register(@Body() registerDto: RegisterUserDto) {
    try {
      const user = await this.authApplicationProvider.register(registerDto);
      return {
        message: 'User registered successfully',
        user: this.mapUserToResponse(user)
      };
    } catch (error) {
      handleAuthError(error);
    }
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Login user and get access token' })
  @ApiBody({ type: LoginUserDto })
  @ApiResponse({ 
    status: HttpStatus.OK, 
    description: 'User successfully logged in',
    schema: {
      properties: {
        access_token: { type: 'string', example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' },
        token_type: { type: 'string', example: 'bearer' },
        user: {
          type: 'object',
          properties: {
            dni: { type: 'string', example: '12345678' },
            email: { type: 'string', example: 'user@example.com' },
            name: { type: 'string', example: 'John Doe' }
          }
        }
      }
    }
  })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Invalid credentials' })
  async login(@Body() loginDto: LoginUserDto) {
    try {
      const user = await this.authApplicationProvider.login(loginDto);
      const token = generateToken(this.jwtService, user);
      
      return {
        access_token: token,
        token_type: 'bearer',
        user: this.mapUserToResponse(user)
      };
    } catch (error) {
      handleAuthError(error);
    }
  }

  @Put(':dni')
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update user information' })
  @ApiBody({ type: UpdateUserDto })
  @ApiResponse({ 
    status: HttpStatus.OK, 
    description: 'User successfully updated',
    schema: {
      properties: {
        message: { type: 'string', example: 'User updated successfully' },
        user: {
          type: 'object',
          properties: {
            dni: { type: 'string', example: '12345678' },
            email: { type: 'string', example: 'user@example.com' },
            name: { type: 'string', example: 'John Doe' }
          }
        }
      }
    }
  })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'User not found' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Invalid input data' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  async update(@Param('dni') dni: string, @Body() updates: UpdateUserDto) {
    try {
      const user = await this.authApplicationProvider.update(updates);
      return {
        message: 'User updated successfully',
        user: this.mapUserToResponse(user)
      };
    } catch (error) {
      handleAuthError(error);
    }
  }

  private mapUserToResponse(user: UserProps) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
}
