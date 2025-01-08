# Flask React Project

This is the starter for the Flask React project.

## Getting started

1. Clone this repository (only this branch).

2. Install dependencies.

   ```bash
   pipenv install -r requirements.txt
   ```

3. Create a __.env__ file based on the example with proper settings for your
   development environment.

4. Make sure the SQLite3 database connection URL is in the __.env__ file.

5. This starter organizes all tables inside the `flask_schema` schema, defined
   by the `SCHEMA` environment variable.  Replace the value for
   `SCHEMA` with a unique name, **making sure you use the snake_case
   convention.**

6. Get into your pipenv, migrate your database, seed your database, and run your
   Flask app:

   ```bash
   pipenv shell
   ```

   ```bash
   flask db upgrade
   ```

   ```bash
   flask seed all
   ```

   ```bash
   flask run
   ```

7. The React frontend has no styling applied. Copy the __.css__ files from your
   Authenticate Me project into the corresponding locations in the
   __react-vite__ folder to give your project a unique look.

8. To run the React frontend in development, `cd` into the __react-vite__
   directory and run `npm i` to install dependencies. Next, run `npm run build`
   to create the `dist` folder. The starter has modified the `npm run build`
   command to include the `--watch` flag. This flag will rebuild the __dist__
   folder whenever you change your code, keeping the production version up to
   date.

## API Documentation

User Authentication
Sign Up
POST /auth/signup
Request Body:
{
 "username": "string",
  "email": "string",
  "password": "string"

}
Response: 
201 Created: User Successfully created.
400 bad request: validation errors.
	Log In
	POST/auth/login
	Request Body:
			{
			 "email": "string",
 "password": "string"
}
Response:
200 OK: returns user details and authentication token.
401 unauthorized: invalid credentials.
	

Book Management
Add Book
POST/books
Request Body:
{
 "title": "string",
  "author": "string",
  "cover_image": "string",
  "description": "string",
  "genre": "string"
}
Response:
201 Created: Book successfully added. 
400 bad Requests: Validation errors
Edit Book
PUT/books/{bookId}
Request Body:
{
 "title": "string",
  "author": "string",
  "cover_image": "string",
  "description": "string",
  "genre": "string"
}
Response:
200 OK: book successfully updated.
404 Not Found: Book not found.
Delete Book
DELETE/book/{bookId}
Response:
204 No Content: Book successfully deleted.
404 Not Found: Book not found.
Get All Book
GET/books
Response:
200 OK: returns a list of all books.
Request body:
{
   "id": "int",
    "title": "string",
    "author": "string",
    "cover_image": "string",
    "description": "string"
}
			
Search Books
GET/books/search
Query parameters: tag(string) <<== (maybe?)
Response:
200 OK: Returns a list of books matching the search criteria.

Review Management
Add Review
POST/{bookId}/reviews
Request Body:
{
 "rating": "int",
  "comment": "string"
}
Response:
201 Created: Review successfully added.
400 Bad Requests: Validation errors.

Get Reviews for a Book
GET/books/{bookId}reviews
Response:
200 OK: Returns a list of reviews for the specified book.
Request Body:
{
   "id": "int",
    "user_id": "int",
    "rating": "int",
    "comment": "string"
}

User Profile Management

Get User Profile
GET/users/1
Response: 
	{
	 "id": "int",
  	"username": "string",
  	"email": "string",
}
Get User’s Books
GET/users/1/books
Response: 
200 OK: Returns a list of books added by the user.

