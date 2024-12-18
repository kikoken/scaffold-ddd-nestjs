# NestJS DDD Scaffold with Clean Architecture

This project serves as a scaffold for building NestJS applications following Domain-Driven Design (DDD) principles and Clean Architecture. It demonstrates how to effectively separate business logic from framework implementation, using the Authentication module as a practical example.

## Project Structure

```
src/
├── core/              # Domain layer
│   ├── auth/          # Authentication domain
│   └── shared/        # Shared domain logic
├── infrastructure/    # Infrastructure layer
│   ├── auth/          # Auth implementation
│   ├── database/      # Database configuration
│   └── health/        # Health checks
└── telemetry/         # Observability components
    ├── tracing.ts     # OpenTelemetry configuration
```

## Features

- 🔐 Authentication & Authorization
- 📊 OpenTelemetry Integration
- 🔍 Real-time Monitoring
- 📝 Swagger Documentation
- 🏗️ DDD Architecture
- 🔒 Security Best Practices

## Tech Stack

- **Framework**: NestJS
- **Database**: PostgreSQL
- **Authentication**: JWT
- **Documentation**: Swagger/OpenAPI
- **Monitoring**: 
  - OpenTelemetry
  - Jaeger (Distributed Tracing)
  - Prometheus (Metrics)
  - Grafana (Visualization)

## Prerequisites

- Node.js >= 18
- Docker & Docker Compose
- PostgreSQL (if running locally)

### Domain-Driven Design (DDD)
- **Clear Separation of Concerns**: Business logic is isolated from framework implementation
- **Domain-First Approach**: Core business rules are framework-agnostic
- **Rich Domain Model**: Business logic lives in the domain layer, not in services
- **Ubiquitous Language**: Consistent terminology across all layers

### Clean Architecture Benefits
1. **Framework Independence**
   - Core business logic is isolated from NestJS framework
   - Easy to switch or upgrade frameworks without affecting business rules
   - Simpler testing of business logic

2. **Maintainability**
   - Clear boundaries between layers
   - Each layer has a single responsibility
   - Easier to understand and modify code

3. **Testability**
   - Domain logic can be tested without infrastructure
   - Easier to mock dependencies
   - Better test coverage

### Functional Programming in Core
We use functional programming principles in the core domain for several reasons:

1. **Immutability**
   - Prevents unexpected state changes
   - Makes code more predictable
   - Easier to reason about

2. **Pure Functions**
   - No side effects
   - Same input always produces same output
   - Easier to test and debug

3. **Function Composition**
   - Build complex operations from simple ones
   - Better code reuse
   - More maintainable code

## Example: Auth Module
The authentication module serves as an example of this architecture:

- `core/auth/`: Contains pure business logic
  - Domain entities
  - Value objects
  - Business rules
  - Use cases

- `infrastructure/auth/`: Contains NestJS implementation
  - Controllers
  - Services
  - DTOs
  - Framework-specific code

## Getting Started

1. Clone the repository:
```bash
git clone <repository-url>
cd scaffold-ddd-nestjs

```bash
# Installation
$ yarn install

# Development
$ yarn start:dev

# Production
$ yarn start:prod
```

## API Documentation
The API is available under the prefix: `api/v1/`

## API Documentation
Access Swagger documentation at:

```
http://localhost:3000/api/docs
```

### Testing Endpoints
The project includes an `auth.http` file with ready-to-use API calls. You can use these with REST Client in VS Code or any HTTP client:

```http
### Health Check
GET http://localhost:3000/api/v1/health/ping

### Register New User
POST http://localhost:3000/api/v1/auth/register
Content-Type: application/json

{
    "dni": "11111111-1",
    "name": "New User",
    "lastName": "Last Name",
    "email": "newuser@example.com",
    "phone": "1234567890",
    "password": "newpassword"
}

### Login
POST http://localhost:3000/api/v1/auth/login
Content-Type: application/json

{
    "dni": "11111111-1",
    "password": "newpassword"
}

## Monitoring & Telemetry
OpenTelemetry
The application uses OpenTelemetry for observability, providing:

- Distributed tracing
- Metrics collection
- Logging integration

## Metrics
Access metrics endpoints:

- Application metrics: http://localhost:3000/metrics
- Prometheus: http://localhost:9090
- Grafana: http://localhost:3001
    Default credentials:
    Username: admin
    Password: admin

## Tracing
View distributed traces:

Jaeger UI: http://localhost:16686
Service name: sc-inspection

## Grafana
Available Dashboards
Grafana comes with pre-configured dashboards for:

HTTP Request Duration
Request Count
Memory Usage
Error Rates

## Security
- CORS enabled
- Helmet middleware
- Rate limiting
- JWT authentication
- Input validation

## Contributing
Feel free to contribute to this project by submitting issues or pull requests.

## License
[MIT licensed](LICENSE)
