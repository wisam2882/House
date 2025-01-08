Wireframe Layout
Home Page
Header: Logo, Navigation Links (Home, My Books, About)
Main Section:
Search Bar to find books (tag name)
Featured Books Section (displaying popular or new books)
List of Books (each book card includes title, author, cover image, and a brief description)
Footer: Links to social media, terms of service
Book Detail Page
Header: Same as Home Page
Book Information:
Title, Author, Cover Image
Description
Reviews Section (user-generated reviews)
Buttons: "Add Review"
Footer: Links to social media, terms of service
User Profile Page
Header: Same as Home Page
User Information:
Profile Picture, Username
List of Books Added by User (with options to edit or delete each entry)
Footer: Links to social media, terms of service
Add/Edit Book Page (pop up)
Header: Same as Home Page
Form Fields:
Title, Author, Cover Image Upload, Description, Genre
Buttons: "Submit" (to add/edit the book), "Cancel"
Footer: Links to social media, terms of service
Features/MVP List
Core Features
User Authentication: Allow users to sign up, log in, and manage their profiles.
Book Management: Users can add, edit, and delete books they have posted.
Review System: Users can post reviews for books they have read.
Search Functionality: Users can search for books by title, author, or genre.
Responsive Design: Ensure the website is mobile-friendly.
Additional Features
Rating System: Allow users to rate books from 1 to 10 stars, where 10 stars represents the worst experience and 1 star represents the best experience.
User Notifications: Notify users of new reviews or comments on their books.
API Documentation
User Authentication
Sign Up
POST /auth/signup
Request Body:
json


{
  "username": "string",
  "email": "string",
  "password": "string"
}
Response:
201 Created: User Successfully created.
400 Bad Request: Validation errors.
Log In
POST /auth/login
Request Body:
json


{
  "email": "string",
  "password": "string"
}
Response:
200 OK: Returns user details and authentication token.
401 Unauthorized: Invalid credentials.
Book Management
Add Book
POST /books
Request Body:
json


{
  "title": "string",
  "author": "string",
  "cover_image": "string",
  "description": "string",
  "genre": "string"
}
Response:
201 Created: Book successfully added.
400 Bad Request: Validation errors.
Edit Book
PUT /books/{bookId}
Request Body:
json


{
  "title": "string",
  "author": "string",
  "cover_image": "string",
  "description": "string",
  "genre": "string"
}
Response:
200 OK: Book successfully updated.
404 Not Found: Book not found.
Delete Book
DELETE /book/{bookId}
Response:
204 No Content: Book successfully deleted.
404 Not Found: Book not found.
Get All Books
GET /books
Response:
200 OK: Returns a list of all books.
Request Body:
json


{
  "id": "int",
  "title": "string",
  "author": "string",
  "cover_image": "string",
  "description": "string"
}
Search Books
GET /books/search
Query Parameters: tag (string)
Response:
200 OK: Returns a list of books matching the search criteria.
Review Management
Add Review
POST /{bookId}/reviews
Request Body:
json


{
  "rating": "int",
  "comment": "string"
}
Response:
201 Created: Review successfully added.
400 Bad Request: Validation errors.
Get Reviews for a Book
GET /books/{bookId}/reviews
Response:
200 OK: Returns a list of reviews for the specified book.
Request Body:
json


{
  "id": "int",
  "user_id": "int",
  "rating": "int",
  "comment": "string"
}
User Profile Management
Get User Profile
GET /users/1
Response:
json


{
  "id": "int",
  "username": "string",
  "email": "string"
}
Get User’s Books
GET /users/1/books
Response:
200 OK: Returns a list of books added by the user.