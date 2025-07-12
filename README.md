# CMS & Discovery API

This project provides a scalable, modular, and well-documented API built with NestJS to support a Content Management System (CMS) and a Discovery service for searching content.


## 🚀 Features

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

## 🧰 Technologies

- [NestJS](https://nestjs.com/)
- [TypeORM](https://typeorm.io/) (with PostgreSQL)
- [class-validator](https://github.com/typestack/class-validator)
- [Swagger (OpenAPI)](https://swagger.io/)
- Redis (for caching, session, and scalability)
- JWT Authentication
- Role-based Access Control (RBAC)


## ⚙️ Installation (Manual)

```bash
git clone https://github.com/alg2mer/content-api.git
cd content-api
````

### Install Dependencies

```bash
npm install
```

### Configuration

```bash
cp .env.example .env
```

Update your `.env` file:

```env
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


## ▶️ Running the App (Locally)

```bash
npm run start:dev
```

* Access the API at: `http://localhost:3000`
  * Default user created by seeder : `admin@app.com` / `password`
* Swagger Docs: `http://localhost:3000/api/docs`


## 🐳 Run with Docker Compose (Recommended)

You can easily launch the full environment (NestJS app, PostgreSQL, Redis, and pgAdmin) using Docker Compose:

```bash
docker compose up --build
```

> Make sure Docker and the Docker Compose plugin are installed on your system.

Once running:

* API: [http://localhost:3000](http://localhost:3000)
  * Default user created by seeder : `admin@app.com` / `password`
* Swagger Docs: [http://localhost:3000/api/docs](http://localhost:3000/api/docs)
* pgAdmin: [http://localhost:5050](http://localhost:5050)

  * Login: `admin@admin.com` / `admin`
  * Add a new server: host = `postgres`, user = `nestuser`, password = `nestpass`


## 📦 Modules Overview

### CMS

* Endpoints to manage content and users.
* Role and permission-based access.
* DTO validation and Swagger decorators.

### Discovery

* Search with flexible filters, pagination, and sorting.
* Built for performance and scalability.

### Users & Permissions

* CRUD for users and roles.
* Protected by JWT and permission guards.

### Auth

* Login endpoint returns JWT token.
* JWT-based protection with role/permission checks.


## 🧱 Design & Architecture

* Clean module boundaries following **SOLID** principles.
* DTOs validated via `class-validator`.
* Authentication and authorization via NestJS Guards.
* Swagger decorators for rich documentation.
* Scalable architecture designed for high-traffic APIs.
* Redis integration for caching and performance.
* Easily extendable with external search systems like **Elasticsearch/OpenSearch**.


## 🧩 Challenges & Notes

* Decoupling CMS and Discovery logic while maintaining integration.
* Balancing clean code with extensive Swagger documentation.
* For heavy traffic and advanced search features, consider:

  * **OpenSearch/Elasticsearch** for indexing.
  * Migrating to **microservices** for horizontal scaling.


## 📬 Contact

**Mustafa Elsir**
[mustafa@alg2mer.com](mailto:mustafa@alg2mer.com)

**Project Link:** [https://github.com/alg2mer/content-api](https://github.com/alg2mer/content-api)
