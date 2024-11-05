# NestJS Microservices Architecture

## Overview
This project implements a scalable microservices architecture using NestJS, following SOLID principles and Domain-Driven Design (DDD) practices. The architecture is designed to be maintainable, testable, and easily extensible.



## Getting Started

### Prerequisites
- Node.js (v18 or later)
- PNPM (v8 or later)
- TypeScript

### Installation
```bash
pnpm install
``` 


### Running the Services
Development mode
```bash
Gateway
pnpm --filter gateway start:dev
User Service
pnpm --filter users start:dev
Run all services
pnpm start:dev

```   


env
Gateway Service
GATEWAY_PORT=3000
User Service
USER_SERVICE_HOST=localhost
USER_SERVICE_PORT=4001


## API Documentation
Once the gateway is running, access the Swagger documentation at:
http://localhost:3000/api/docs


## Development Guidelines

### Code Style
- Follow NestJS best practices
- Use SOLID principles
- Implement proper error handling
- Write comprehensive tests
- Document public APIs

### Commit Convention
We follow conventional commits specification:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `style`: Code style changes
- `refactor`: Code refactoring
- `test`: Testing
- `chore`: Maintenance


## Microservices Communication

### Message Patterns
- Command: `{ cmd: 'commandName' }`
- Event: `{ event: 'eventName' }`


## Error Handling
- Use Result type for operation results
- Implement proper error responses
- Handle microservice communication errors

## Contributing
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'feat: Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Architecture Overview

### Gateway Service
- Acts as the API Gateway
- Handles request/response transformation
- Routes requests to appropriate microservices
- Implements API documentation using Swagger

### User Service
- Manages user-related operations
- Handles user authentication and authorization
- Implements user CRUD operations

### Core Library
- Contains shared core library

├── apps/
│ ├── gateway/ # API Gateway Service
│ │ ├── src/
│ │ │ ├── modules/ # Feature modules
│ │ │ ├── main.ts # Gateway entry point
│ │ │ └── app.module.ts # Root module
│ │ └── test/ # Gateway tests
│ │
│ └── users/ # User Microservice
│ ├── src/
│ │ ├── modules/ # Feature modules
│ │ ├── main.ts # Service entry point
│ │ └── app.module.ts # Root module
│ └── test/ # User service tests
│
├── libs/
│ └── core/ # Shared core library
│ ├── src/
│ │ ├── types/ # Shared types
│ │ └── utils/ # Shared utilities
│ └── test/ # Core library tests
│
├── package.json
├── pnpm-workspace.yaml
├── tsconfig.json
└── README.md






