from .db import db, environment, SCHEMA, add_prefix_for_prod

class Review(db.Model):
    __tablename__ = 'reviews'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    book_id = db.Column(db.Integer, db.ForeignKey('books.id'), nullable=False)
    userId = db.Column(db.Integer, nullable=False) 
    rating = db.Column(db.Integer, nullable=False)
    comment = db.Column(db.Text, nullable=True)


    

    def to_dict(self):
        return {
            "id": self.id,
            "book_id": self.book_id,
            "userId": self.userId,
            "rating": self.rating,
            "comment": self.comment
        }



# from . import db

# class Review(db.Model):
#     __tablename__ = 'reviews'

#     id = db.Column(db.Integer, primary_key=True)
#     book_id = db.Column(db.Integer, db.ForeignKey('books.id'), nullable=False)
#     user_id = db.Column(db.Integer, nullable=False)  # Assuming user management is implemented
#     rating = db.Column(db.Integer, nullable=False)
#     comment = db.Column(db.Text, nullable=True)

#     def to_dict(self):
#         return {
#             "id": self.id,
#             "book_id": self.book_id,
#             "user_id": self.user_id,
#             "rating": self.rating,
#             "comment": self.comment
#         }
