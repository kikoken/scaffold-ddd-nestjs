import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from '@/app.controller';
import { AppService } from '@/app.service';
import { AuthModule } from '@/infrastructure/auth/auth.module';
import { HealthModule } from '@/infrastructure/health/health.module';
import { DatabaseModule } from '@/infrastructure/database/database.module';
import { MetricsController } from './telemetry/metric.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    AuthModule, 
    HealthModule, 
    DatabaseModule
  ],
  controllers: [AppController, MetricsController],
  providers: [AppService],
})
export class AppModule {}
