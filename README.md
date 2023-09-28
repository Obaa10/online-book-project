# Online Book Project

The Online Book Project is a sample microservices project consisting of three services: Book Service, User Service, and Order Service. Each service is developed using different frameworks and languages, showcasing the versatility of microservices architecture.

## Purpose

The main objective of this project is to demonstrate the implementation of microservices architecture and explore the usage of various frameworks and languages for each service. By employing separate services, the project emphasizes the independent development, deployment, and scalability of individual components.

## Services

### Book Service
- Built with Laravel framework
- Utilizes MySQL for data storage

### User Service
- Built with Node.js and Express framework
- Developed using TypeScript
- Utilizes MongoDB for data storage

### Order Service
- Built with Node.js and Express framework
- Utilizes MongoDB for data storage


## Getting Started

To get started with the Online Book Project, follow the steps below:

1. Clone the repository:
```
git clone https://github.com/Obaa10/online-book-project
```
2. Install the necessary dependencies for each service:
- For Book Service:
  ```
  cd book-service
  composer install
  ```

- For User Service:
  ```
  cd user-service
  npm install
  ```

- For Order Service:
  ```
  cd order-service
  yarn install
  ```

3. Configure the database connections for each service:
- For Book Service: Update the `.env` file with your MySQL database details.

- For User Service and Order Service: Update the `.env` file with your MongoDB connection string.

4. Run the database migrations and seeders for each service:
- For Book Service:
  ```
  cd book-service
  php artisan migrate --seed
  ```

- For User Service and Order Service:
  ```
  cd user-service
  npm run migrate-seed
  ```

5. Start each service:
- For Book Service:
  ```
  cd book-service
  php artisan serve
  ```

- For User Service:
  ```
  cd user-service
  npm run start
  ```

- For Order Service:
  ```
  cd order-service
  yarn start
  ```

6. Access the services through their respective endpoints.

## Contributing

Contributions are welcome! If you have any ideas or suggestions, please feel free to open an issue or pull request.

   
