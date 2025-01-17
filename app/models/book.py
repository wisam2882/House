from . import db

class Book(db.Model):
    __tablename__ = 'books'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    author = db.Column(db.String(255), nullable=False)
    cover_image = db.Column(db.String(255), nullable=True)
    description = db.Column(db.Text, nullable=True)
    genre = db.Column(db.String(100), nullable=True)

    # Define the relationship to Review through the join table
    user = db.relationship("User", back_populates="books")
    reviews = db.relationship('Review', back_populates="books")
    
    def to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "author": self.author,
            "cover_image": self.cover_image,
            "description": self.description,
            "genre": self.genre
        }