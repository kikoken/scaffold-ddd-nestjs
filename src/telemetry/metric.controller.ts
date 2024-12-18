import { Controller, Get } from '@nestjs/common';
import { collectDefaultMetrics, Registry, Counter, Histogram } from 'prom-client';

@Controller('metrics')
export class MetricsController {
    private readonly register: Registry;
    private readonly httpRequestsCounter: Counter;
    private readonly httpRequestDuration: Histogram;

    constructor() {
        this.register = new Registry();
        
        // Métricas por defecto de Node.js
        collectDefaultMetrics({ register: this.register });

        // Contador personalizado para requests HTTP
        this.httpRequestsCounter = new Counter({
            name: 'http_requests_total',
            help: 'Total number of HTTP requests',
            labelNames: ['method', 'path', 'status'],
            registers: [this.register]
        });

        // Histograma para duración de requests
        this.httpRequestDuration = new Histogram({
            name: 'http_request_duration_seconds',
            help: 'Duration of HTTP requests in seconds',
            labelNames: ['method', 'path', 'status'],
            buckets: [0.1, 0.5, 1, 2, 5],
            registers: [this.register]
        });
    }

    @Get()
    async getMetrics(): Promise<string> {
        return await this.register.metrics();
    }

    // Métodos para usar en los interceptores
    incrementHttpRequests(method: string, path: string, status: string): void {
        this.httpRequestsCounter.labels(method, path, status).inc();
    }

    observeHttpRequestDuration(method: string, path: string, status: string, duration: number): void {
        this.httpRequestDuration.labels(method, path, status).observe(duration);
    }
}