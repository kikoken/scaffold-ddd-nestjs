import { Controller, Get } from '@nestjs/common';
import { version } from '../../../package.json';

@Controller('health')
export class HealthController {
  @Get('ping')
  async healthCheck() {
    return {
      status: 'UP',
      timestamp: new Date().toISOString(),
      version,
      details: {
        database: 'UP',
        cache: 'UP',
        messageQueue: 'UP'
      }
    };
  }
}
