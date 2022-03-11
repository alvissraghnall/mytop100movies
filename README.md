## My Top 100 Movies

 ___**An Express RESTful API service using JWT tokens to perform CRUD operations on a PostgreSQL Database containing users' favorite movies.**___
 
 
### Live Demo
...incoming...

### Running the app
1. `git clone git@github.com:alvissraghnall/mytop100movies.git`
2. `yarn install`
3. Create a .env file, and populate with the following properties:
  ```
    DB_USER=<your_postgresql_user_name>
    DB_NAME=<your_postgresql_database_name>
    DB_PASSWORD=<your_postgresql_user_password>
    DB_PORT=<your_postgresql_port>{defaults to 5432}
    DB_HOST=localhost
    PORT=2222
  ```
4. Run `yarn prod:serve`


### API Endpoints

- /register -> Accepts a request body with 3 parameters:
  1. name ::: User full name
  2. email ::: User Email address
  3. password ::: User Password
  
  This route first checks if user email exists on Database by sending a Sequelize query whenever the user data is submitted. 
  If user email already exists, endpoint returns a ‘401: Unauthorized’, urging user to login instead.
  However, if email isn't in use yet, it successfully registers user.


- /login -> accepts a reauest body with 2 fields:
  1. email ::: User email
  2. password ::: User password
  
  This route checks first if the email entered is valid email(using regexp), and if true, verifies password entered against that stored in database (we store salt + hash). If all goes well, it returns two tokens — a refresh token, which expires after an hour, and an access token, which expires after 15 minutes.
  
