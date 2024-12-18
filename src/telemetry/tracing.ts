import { NodeSDK } from '@opentelemetry/sdk-node';
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
import { Resource } from '@opentelemetry/resources';
import { diag, DiagLogLevel, DiagConsoleLogger } from '@opentelemetry/api';
import { BatchSpanProcessor } from '@opentelemetry/sdk-trace-base';

// Habilitar logging detallado para debug
diag.setLogger(new DiagConsoleLogger(), DiagLogLevel.DEBUG);

const resource = Resource.default().merge(
  new Resource({
    'service.name': process.env.OTEL_SERVICE_NAME || 'ba-inspection',
    'service.version': '1.0.0',
    'deployment.environment': process.env.NODE_ENV || 'development'
  })
);

const sdk = new NodeSDK({
  resource,
  spanProcessor: new BatchSpanProcessor(
    new OTLPTraceExporter({
      url: `${process.env.OTEL_EXPORTER_OTLP_ENDPOINT}/v1/traces` || 'http://localhost:4318/v1/traces'
    })
  ),
  instrumentations: [getNodeAutoInstrumentations()]
});

export const initializeTracing = async () => {
  try {
    await sdk.start();
    console.log('Tracing initialized with endpoint:', process.env.OTEL_EXPORTER_OTLP_ENDPOINT);
    console.log('Service name:', process.env.OTEL_SERVICE_NAME);

    process.on('SIGTERM', async () => {
      try {
        await sdk.shutdown();
        console.log('Tracing terminated');
      } catch (error) {
        console.error('Error terminating tracing', error);
      } finally {
        process.exit(0);
      }
    });
  } catch (error) {
    console.error('Error initializing tracing', error);
  }
};