import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Staff } from '../schemas/staff.entity';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const username = configService.get<string>('DB_USERNAME');
        const password = configService.get<string>('DB_PASSWORD');
        const host = configService.get<string>('DB_HOST');
        const port = configService.get<number>('DB_PORT');
        const database = configService.get<string>('DB_NAME');
        const nodeEnv = configService.get<string>('NODE_ENV', 'development');

        // Validate configuration
        if (!username || !password || !host || !port || !database) {
          throw new Error('Database configuration is incomplete');
        }

        const isDevelopment = nodeEnv === 'development';

        return {
          type: 'postgres',
          host,
          port,
          username,
          password,
          database,
          entities: [Staff],
          synchronize: isDevelopment,
          logging: isDevelopment,
          ...(isDevelopment ? {} : {
            // Configuraciones específicas para producción
            ssl: false, // Ajusta según tus necesidades
            retryAttempts: 10,
            retryDelay: 3000,
            keepConnectionAlive: true,
          }),
        };
      },
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
