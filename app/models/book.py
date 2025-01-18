from .db import db, user_books, book_reviews, environment, SCHEMA, add_prefix_for_prod

class Book(db.Model):
    __tablename__ = 'books'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    author = db.Column(db.String(255), nullable=False)
    cover_image = db.Column(db.String(255))
    description = db.Column(db.Text)
    genre = db.Column(db.String(100))

    # Relationships
    reviews = db.relationship('Review', secondary='book_reviews', back_populates='books')
    users = db.relationship('User', secondary='user_books', back_populates='books')

    def __init__(self, title, author, cover_image=None, description=None, genre=None):
        self.title = title
        self.author = author
        self.cover_image = cover_image
        self.description = description
        self.genre = genre

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'author': self.author,
            'cover_image': self.cover_image,
            'description': self.description,
            'genre': self.genre
        }

    # Add the Review import here when needed
    def add_reviews(self):
        from app.models.review import Review  # delayed import to avoid circular import
        # Logic that uses Review model
        pass
