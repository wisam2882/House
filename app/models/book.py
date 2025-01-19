from .db import db, environment, SCHEMA, add_prefix_for_prod

class Book(db.Model):
    __tablename__ = 'books'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    author = db.Column(db.String(255), nullable=False)
    cover_image = db.Column(db.String(255), nullable=True)
    description = db.Column(db.Text, nullable=True)
    creatorId = db.Column(db.Integer, db.ForeignKey(f'{SCHEMA}.users.id'), nullable=False)  # Use schema prefix here
    genre = db.Column(db.String(100), nullable=True)

    user = db.relationship('User', back_populates='books')

    def to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "author": self.author,
            "cover_image": self.cover_image,
            "description": self.description,
            "genre": self.genre,
            "userId": self.user.id  # Ensure you're referencing user.id correctly
        }
