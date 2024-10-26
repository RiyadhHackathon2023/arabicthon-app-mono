# How to run
To run this project with docker compose : 

```
git clone git@github.com:RiyadhHackathon2023/arabicthon-app-mono.git
docker compose build
docker compose up
```

## Services Overview

- **Backend Application**: Interacts with PostgreSQL, Redis, Neo4j, and Swift for object storage.
- **Frontend Application**: Connects to the backend via an API.
- **PostgreSQL**: Stores relational data for the backend.
- **Redis**: Provides in-memory data storage for caching.
- **Neo4j**: A graph database used by the backend.
- **Swift**: An object storage system for documents and other files.

## Environment Variables

### Backend Application

The backend service depends on several environment variables for proper configuration. Below is a description of each:

| **Variable Name**      | **Description**                                                                                                                            |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| `POSTGRES_USER`        | PostgreSQL username. Set to `root` in this setup.                                                                                           |
| `POSTGRES_PASSWORD`    | Password for the PostgreSQL database. Used to authenticate the backend with PostgreSQL.                                                     |
| `POSTGRES_DB`          | The name of the PostgreSQL database. Set to `backend_db`.                                                                                   |
| `POSTGRES_HOST`        | The hostname of the PostgreSQL service, set to `postgres`, which corresponds to the service name in the Docker network.                     |
| `SWIFT_ACCOUNT_ID`     | Swift object storage account ID. Default is `AUTH_test`.                                                                                    |
| `SWIFT_ACCOUNT`        | Swift account username, set to `test:tester`.                                                                                               |
| `SWIFT_KEY`            | Key used for authenticating with Swift storage. Default is `testing`.                                                                       |
| `SWIFT_AUTH_URL`       | URL for Swift's authentication endpoint. Set to `http://swift-storage:12345/auth/v1.0`.                                                     |
| `SWIFT_ENDPOINT`       | Endpoint for the Swift object storage, set to `http://swift-storage:12345`.                                                                 |
| `SWIFT_AUTH_VERSION`   | Authentication version for Swift. Set to `1`.                                                                                               |
| `CONTAINER`            | Swift storage container name. In this setup, it's `documents`.                                                                              |
| `REDIS_HOST`           | Hostname for the Redis service, set to `redis` which refers to the service in the Docker Compose network.                                   |
| `REDIS_PORT`           | Port on which the Redis service runs. Default is `6379`.                                                                                    |
| `NEO4J_USER`           | Username for Neo4j database access. Default is `neo4j`.                                                                                     |
| `NEO4J_PASS`           | Password for the Neo4j database. Set to `E53hCDHJjVnO8aTLMejfxtmz1G7q9LplVVO6K5L6drg`.                                                      |
| `NEO4J_URI`            | The URI to connect to the Neo4j database, set to `neo4j://neo4j:7687`.                                                                      |
 `COHERE_API_KEY`            | Your cohere API key|

### PostgreSQL Service

| **Variable Name**      | **Description**                                                                                                                            |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| `POSTGRES_USER`        | PostgreSQL username. Default is `root`.                                                                                                     |
| `POSTGRES_PASSWORD`    | Password for PostgreSQL authentication. Default is `root`.                                                                                  |
| `POSTGRES_DB`          | The database name, set to `backend_db`.                                                                                                     |

### Redis Service

The Redis service does not require any additional environment variables beyond the standard Docker Compose configuration. It runs on port `6379`.

### Neo4j Service

| **Variable Name**      | **Description**                                                                                                                            |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| `NEO4J_AUTH`           | The authentication setup for Neo4j. Set to `none` in this setup to disable authentication.                                                  |

### Swift Object Storage Service

Swift is set up using the following configuration variables:

| **Variable Name**      | **Description**                                                                                                                            |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| `SWIFT_ACCOUNT_ID`     | Swift object storage account ID. Default is `AUTH_test`.                                                                                    |
| `SWIFT_ACCOUNT`        | Swift account username, set to `test:tester`.                                                                                               |
| `SWIFT_KEY`            | Key used for authenticating with Swift storage. Default is `testing`.                                                                       |
| `SWIFT_AUTH_URL`       | URL for Swift's authentication endpoint. Set to `http://swift-storage:12345/auth/v1.0`.                                                     |
| `SWIFT_ENDPOINT`       | Endpoint for the Swift object storage, set to `http://swift-storage:12345`.                                                                 |
| `SWIFT_AUTH_VERSION`   | Authentication version for Swift. Set to `1`.                                                                                               |
| `CONTAINER`            | Swift storage container name. In this setup, it's `documents`.                                                                              |

### Frontend Application

| **Variable Name**      | **Description**                                                                                                                            |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| `REACT_APP_BACKEND_URL`| The URL for the backend API, set to `http://localhost:8000` to allow communication between the frontend and backend.                        |


## Running the Project

1. Clone the repository and navigate to the project directory.
2. Build and run the containers using the following command:

   ```bash
   docker-compose up --build
   ```

3. Ensure that all services are running properly by checking the logs:

   ```bash
   docker-compose logs
   ```

4. Access the services:
   - Backend: `http://localhost:8000`
   - Frontend: `http://localhost:3000`
   - Neo4j Browser: `http://localhost:7474`
   - Swift Auth: `http://localhost:12345/auth/v1.0`



If you have a local environement variables file named `env.local` for example
you can add it to the compose file:
```yaml
  backend-app:
    build: ./backend
    container_name: backend_app
    ports:
      - "8000:8000"
    depends_on:
      - postgres
      - redis
      - neo4j
      - swift
    env_file:
      - .env.local
    networks:
      - net
```