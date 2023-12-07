# User Manager

User Manager is an application for user management, created using Node.js and MySQL. The application provides a set of APIs for user registration, login, and account management. It utilizes JWT Token for authentication and password encryption during registration.

***

## Features:

* Register a new user
* Login to get JWT token
* Access information of logged in user
* Modify the account information of the logged in user
* Delete the account of the logged in user

## Technologies Used:
* Node.js
* MySQL
* JWT (JSON Web Token)
* Bcrypt (for password encryption)
* crypto (for email encryption)

## Installation

Clone the repository to a local directory: __git clone <repository_url>__


### Frontend
1. Navigate to the `frontend` directory: `cd frontend`

2. Install frontend dependencies using npm: `npm install`

3. Start the frontend: `npm start`
   * The Vite+React application will be accessible at: `http://localhost:5173`

### Backend
1. Clone the repository to a local directory: `git clone <repository_url>`

2. Install dependencies using npm: `npm install`

3. Configure the MySQL database:
   * Create a new MySQL database using the `backend/db/schema.sql` file
   * Modify the database connection information in the `.env` file

4. Run the backend server: `npm start`
   * The APIs will be accessible at: `http://localhost:5000`

***

## Future Features

1. More...

## Contributions

Contributions are welcome to improve and expand the features of User Manager. If you'd like to contribute, please open a pull request with your changes.

## License

This project is licensed under the terms of the MIT license. Please see the LICENSE file for more information.