# CMS & Discovery API

This project provides a scalable, modular, and well-documented API built with NestJS to support a Content Management System (CMS) and a Discovery service for searching content.


## Features

- **CMS Module**
  - Create, edit, and manage visible content.
  - Set metadata such as title, description, category, duration, language, and publish date.
  - Role and permission-based access control.
  - JWT authentication and authorization.

- **Discovery Module**
  - Search content with filters like keyword, type, author, pagination, and sorting.
  - Optimized for high scalability (designed to handle millions of requests per hour).

- **API Documentation**
  - Fully documented API with Swagger/OpenAPI.
  - Interactive API docs available at `/api/docs`.


## Technologies

- [NestJS](https://nestjs.com/)
- [TypeORM](https://typeorm.io/) (with PostgreSQL or your preferred database)
- [class-validator](https://github.com/typestack/class-validator)
- [Swagger (OpenAPI)](https://swagger.io/)
- JWT Authentication
- Role-based Access Control (RBAC)


## Installation

```bash
git clone https://github.com/alg2mer/content-api.git

cd content-api
```

**Install the project**

```bash
npm install
```

## Configuration

```bash
cp .env.example .env
```

Copy `.env.example` to `.env` and update your environment variables:

```ini
# PostgreSQL
DATABASE_USERNAME=nestuser
DATABASE_PASSWORD=nestpass
DATABASE_NAME=nestdb
DATABASE_HOST=postgres
DATABASE_PORT=5432

# Redis
REDIS_HOST=redis
REDIS_PORT=6379
REDIS_TTL=60000

# App
JWT_SECRET=secret_for_jwt
PORT=3000
```

## Running the Application

```bash
npm run start:dev
```

The API will be available at `http://localhost:3000`.


## API Documentation

Visit the Swagger UI at:

```
http://localhost:3000/api/docs
```

This documentation includes all available endpoints, request/response schemas, authentication mechanisms, and example requests.


## Modules Overview

### CMS

* Endpoints to create, read, update, and delete content.
* Endpoints to create, read, update, and delete users.
* DTOs include validation and Swagger decorators.
* Permissions required for creating, editing, and deleting content.

### Discovery

* Endpoint to search content with various filters and pagination.
* Supports sorting and flexible query parameters.
* Designed for high performance and scalability.

### Users & Permissions

* User management endpoints with role and permission assignments.
* Secure with JWT and permission guards.

### Auth

* Login endpoint returning JWT tokens.
* Secure endpoints with JWT and roles.


## Design & Architecture

* Follows **SOLID** principles with low coupling and clear module boundaries.
* Uses NestJS Guards for authentication and authorization.
* DTOs use `class-validator` for request validation.
* Swagger decorators provide rich API documentation.
* Scalable to serve millions of requests per hour with efficient database queries and caching.

## Challenges & Notes

* Handling scalability with minimal coupling between CMS and Discovery modules.
* Balancing detailed Swagger documentation while keeping code clean.
* Ensuring permission and role checks are granular and secure.
* Designing flexible search DTOs to accommodate future filters without breaking the API.
* For high traffic and large-scale search operations, consider integrating **Elasticsearch** or **OpenSearch** instead of relying solely on database queries.
* While this project uses a monolithic structure for simplicity, adopting a **microservices architecture** is recommended if the system is expected to grow significantly — enabling independent scaling, better fault isolation, and modular development.


## Contact

Mustafa Elsir — \[mustafa@alg2mer.com](mailto:mustafa@alg2mer.com)

Project Link: [https://github.com/alg2mer/content-api](https://github.com/alg2mer/content-api)
