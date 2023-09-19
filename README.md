# Face Identifier API

Welcome to the Face Identifier API repository! This API provides backend functionality for the Face Identifier web application. It includes endpoints for user authentication, registration, and face detection.

## Running the API Locally

To run the Face Identifier API locally, please follow these steps:

1. Clone the repository: `git clone https://github.com/mereluo/face-identifier-api.git`.
2. Install the required dependencies: `npm install`.
3. Set up the PostgreSQL database and configure the connection in the application.
4. Start the server: `nodemon server.js`.
5. The API will now be running on `http://localhost:8080`.

### Environment Variables

Make sure to set the following environment variables either through a `.env` file or directly in your environment

e.g., `DATABASE_URL`: The connection URL for the PostgreSQL database.

### API Endpoints

The Face Identifier API provides the following endpoints:

-   **POST /register**: Register a new user by providing the necessary user information.
-   **POST /signin**: Sign in with an existing user account and obtain an access token.
-   **GET /profile/:userId**: Retrieve the user profile information by providing the user ID.
-   **PUT /image**: Update the user's entry count.
-   **POST /imageurl**: Upload an image file to detect faces

Please refer to the API documentation or code for further details on request and response formats.

## License

This project is licensed under the [MIT License](LICENSE).

Feel free to reach out with any questions or feedback!
