import { initializeTracing } from './telemetry/tracing';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import helmet from 'helmet';
import * as compression from 'compression';

async function bootstrap() {
  try {
    // Initialize OpenTelemetry
    await initializeTracing();

    const app = await NestFactory.create(AppModule);
    const configService = app.get(ConfigService);

    // Security
    app.use(helmet());
    app.enableCors({
      origin: configService.get('CORS_ORIGIN', '*'),
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
      credentials: true,
    });

    // Compression
    app.use(compression());

    // API prefix
    app.setGlobalPrefix('api/v1');

    app.setGlobalPrefix('api/v1', {
      exclude: ['metrics'],
    });

    // Swagger Documentation
    const config = new DocumentBuilder()
      .setTitle('Scafolding API DDD')
      .setDescription('API documentation for scafolding system')
      .setVersion('1.0')
      .addBearerAuth()
      .build();
    
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api/docs', app, document);

    // Start server
    const port = configService.get('PORT', 3000);
    await app.listen(port);
    
    console.log(`Application is running on: ${await app.getUrl()}`);
    console.log(`Swagger documentation is available at: ${await app.getUrl()}/api/docs`);
  } catch (error) {
    console.error('Error during application bootstrap:', error);
    process.exit(1);
  }
}

bootstrap();
