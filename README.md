## Overview

The NestJS Clean Architecture Template is designed to help developers create robust and maintainable applications by following the principles of Clean Architecture. It separates the application into distinct layers, ensuring a clear separation of concerns and promoting modularity.

## Folder Structure

The template organizes the application code under the `src` directory using the following folder structure:

```
├── src
│   ├── application
│   │   └── sample
│   ├── domains
│   │   └── sample
│   │       ├── entities
│   │       ├── repositories
│   │       └── services
│   ├── infrastructure
│   │   ├── postgres
│   └── interface
│       └── web
└── test
```

- `application`: This folder contains the application layer of the Clean Architecture. It includes use cases and application-specific logic. In the example, there is a `sample` folder representing a sample application.

- `domains`: This folder represents the domain layer of the Clean Architecture. It contains the core business logic, entities, repositories, and services. The `sample` folder is an example of a domain within the application.
  - `entities`: This folder contains the domain entities, which represent the core business objects and their behavior.
  - `repositories`: This folder contains the repository interfaces. Repositories provide an abstraction layer between the domain and the data persistence layer, defining the contract for interacting with the database or other data sources.
  - `services`: This folder contains the domain services, which encapsulate the business logic and operations related to the domain.

- `infrastructure`: This folder represents the infrastructure layer of the Clean Architecture. It includes the implementation details of external services, databases, and other infrastructure-related components. The repository implementations, which depend on specific technologies like databases or ORMs, are also placed in this layer.

- `interface`: This folder contains the interface layer of the Clean Architecture. It includes the user interface, APIs, and other entry points to the application.
  - `web`: This folder represents the web interface of the application, which can include controllers, resolvers, and other web-related components.

- `test`: This folder contains the unit tests and integration tests for the application.

The folder structure follows the principles of Clean Architecture, where each layer has a specific responsibility and depends only on the layers below it. This promotes a clear separation of concerns and makes the application more modular and maintainable.

## Prerequisites

Before getting started with the template, ensure that you have the following installed on your local machine:

- Docker: The template uses Docker to set up the development environment and run the application.

## Building the Application

To build the application, follow these steps:

1. Clone the repository to your local machine.
2. Open a terminal and navigate to the project's root directory.
3. Run the following command to build the Docker containers:

   ```
   docker compose build
   ```

   This command will build the NestJS application using the provided Dockerfile.

## Running the Application

Once the application is built, you can run it using Docker Compose:

1. In the terminal, make sure you are in the project's root directory.
2. Run the following command to start the application:

   ```
   docker compose up
   ```

   This command will start the NestJS application and its associated services defined in the `docker-compose.yml` file.

   During the startup process, the application will also run any pending migrations to ensure that the database schema is up to date.

3. Access the application by opening a web browser and navigating to `http://localhost:3000`.

## Dockerfile

The provided Dockerfile defines the steps to build the NestJS application container. It starts with a Node.js 20 Alpine base image, copies the application files, installs the dependencies, builds the application, and sets the command to run the application using the `node` command.

## Docker Compose

The `docker-compose.yml` file defines the services required for running the NestJS application. It includes two services:

1. `nestjs`: The NestJS application service, which is built using the provided Dockerfile. It maps port 3000 from the container to the host machine, mounts the application directory as a volume, and sets the command to run the application in development mode using `npm run start:dev`. The service also loads environment variables from the `.env` file.

2. `postgres`: The PostgreSQL database service, which uses the official PostgreSQL 16.2 image. It maps port 5432 from the container to the host machine, mounts a named volume for data persistence, and loads environment variables from the `.env` file.

The `volumes` section defines a named volume `postgres-data` to persist the PostgreSQL data across container restarts.


## Conclusion

The NestJS Clean Architecture Template provides a solid foundation for building scalable and maintainable applications using NestJS and Clean Architecture principles. By following the provided build and run instructions, you can quickly set up and start developing your application with a clean and organized structure.

Feel free to explore the template, customize it to your needs, and happy coding!