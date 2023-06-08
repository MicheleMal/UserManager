# User Manager

User Manager is an application for user management, created using Node.js and MySQL. The application provides a set of APIs for user registration, login, and account management. It utilizes JWT Token for authentication and password encryption during registration.

***

### Features:

* Register a new user
* Login to obtain JWT Token
* Access logged-in user's information
* Modify the account information of the logged-in user
* Delete the account of the logged-in user
* Retrieve all registered users (only for administrators)

### Technologies Used:
* Node.js
* MySQL
* JWT (JSON Web Token)
* Bcrypt (for password encryption)

### Installation

1. Clone the repository to a local directory: __git clone <repository_url>__

2. Install dependencies using npm: __npm install__

3. Configure the MySQL database:
   * Create a new MySQL database using the __backend/db/schema.sql__ file
   * Modify the database connection information in the .env file

### Run the Application
* npm start
* The APIs will be accessible at: http://localhost:3000

### API Endpoints
* POST auth/signup: Register a new user with provided details
* POST auth/login: Perform login and return JWT Token for authentication
* GET manager/users/profile: Get the information of the logged-in user (requires authentication)
* PATCH manager/users/modify: Modify the account information of the logged-in user (requires authentication)
* DELETE manager/users/delete: Delete the account of the logged-in user (requires authentication)
* GET manager/users/all: Retrieve all registered users (__COMING SOON__: requires administrator authorization)

***

### Future Features

1. User interface developed in React to interact with the APIs
2. User role management
3. More...

### Contributions

Contributions are welcome to improve and expand the features of User Manager. If you'd like to contribute, please open a pull request with your changes.

### License

This project is licensed under the terms of the MIT license. Please see the LICENSE file for more information.