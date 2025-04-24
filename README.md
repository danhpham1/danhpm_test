# Phạm Minh Danh

## Overview

This project consists of a **backend** built with **NestJS** and **Microsoft SQL Server (MSSQL)** and a **frontend** built with **ReactJS**. The entire application is containerized using **Docker Compose** for easy setup and deployment.

## Prerequisites

Ensure you have the following installed on your system:

- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/)

## Test User Credentials

To log in and test the application, use the following credentials:

- **Username:** `admin`
- **Password:** `admin@123`

📌 _Note:_ These credentials are for testing purposes only. Please update them for production.

## Installation

### 1. Clone the Repository

```sh
git clone <your-repository-url>
cd <your-repository-name>
```
### 2. Start the Application

📌 Docker Compose will now use the correct image automatically! 🎉


```sh
docker-compose up -d --build
```

This will build and start all services in detached mode.

### 3. Verify Services

- **Backend API** should be available at: [http://localhost:3000](http://localhost:3000)
- **Frontend** should be available at: [http://localhost:8080](http://localhost:8080)
- **MSSQL Database** should be running and accessible via port **1333**

## Stopping the Application

To stop all containers, run:

```sh
docker-compose down
```