# MERN Stack Project with GraphQL and Authentication

This project is a full-stack web application that utilizes the MERN stack (MongoDB, Express.js, React, Node.js) with GraphQL for API operations and includes user authentication.

## Features

- **CRUD Operations:** Perform Create, Read and Update operations on users records.
- **User Authentication:** Secure user authentication using JSON Web Tokens (JWT).
- **GraphQL API:** Utilize GraphQL for efficient and flexible API operations.
- **Configurable:** Easily configure the project using a `config.env` file.

## Getting Started

### Frontend (Client)

1. Navigate to the `client` directory:

    ```bash
    cd client
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Run the frontend:

    ```bash
    npm start
    ```

### Backend (Server)

1. Create a `config.env` file in the `server/config` directory with the following content:

    ```env
    PORT=4000
    DB_URL=mongodb://localhost:27017/studentclear
    JWT_SECRET=thisisvalidforuserhohaveregisterwithus
    JWT_EXPIRE=1d
    ```

2. Navigate to the `server` directory:

    ```bash
    cd server
    ```

3. Install dependencies:

    ```bash
    npm install
    ```

4. Run the backend:

    ```bash
    npm run dev
    ```

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
