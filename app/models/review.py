from .db import db, environment, SCHEMA, add_prefix_for_prod

class Review(db.Model):
    __tablename__ = 'reviews'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    book_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('books.id')), nullable=False)
    userId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)  # Add foreign key reference
    rating = db.Column(db.Integer, nullable=False)
    comment = db.Column(db.Text, nullable=True)


    
    book = db.relationship('Book', back_populates='reviews')  # Relationship to Book
    user = db.relationship('User', back_populates='reviews')  # Relationship to User


    def to_dict(self):
        return {
            "id": self.id,
            "book_id": self.book_id,
            "userId": self.userId,
            "rating": self.rating,
            "comment": self.comment
        }



