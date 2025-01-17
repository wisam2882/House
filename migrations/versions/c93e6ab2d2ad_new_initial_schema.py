from alembic import op
import sqlalchemy as sa
import os

# Get environment and schema info
environment = os.getenv("FLASK_ENV")
SCHEMA = os.environ.get("SCHEMA")

# Revision identifiers, used by Alembic.
revision = 'new_revision_id'  # Replace with your desired revision ID.
down_revision = None  # Set to None if this is the first migration in the chain.
branch_labels = None
depends_on = None

def upgrade():
    # Create the users table
    op.create_table('users',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('username', sa.String(length=40), nullable=False),
        sa.Column('email', sa.String(length=255), nullable=False),
        sa.Column('hashed_password', sa.String(length=255), nullable=False),
        sa.PrimaryKeyConstraint('id'),
        sa.UniqueConstraint('email'),
        sa.UniqueConstraint('username')
    )

    if environment == "production":
        op.execute(f"ALTER TABLE users SET SCHEMA {SCHEMA};")
    
    # Create the books table
    op.create_table('books',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('title', sa.String(length=255), nullable=False),
        sa.Column('author', sa.String(length=255), nullable=False),
        sa.Column('cover_image', sa.String(length=255), nullable=True),
        sa.Column('description', sa.Text(), nullable=True),
        sa.Column('genre', sa.String(length=100), nullable=True),
        sa.Column('user_id', sa.Integer(), nullable=False),  # Foreign key reference to users
        sa.PrimaryKeyConstraint('id')
    )

    # Create the reviews table
    op.create_table('reviews',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('book_id', sa.Integer(), nullable=False),
        sa.Column('user_id', sa.Integer(), nullable=False),
        sa.Column('rating', sa.Integer(), nullable=False),
        sa.Column('comment', sa.Text(), nullable=True),
        sa.ForeignKeyConstraint(['book_id'], ['books.id']),
        sa.PrimaryKeyConstraint('id')
    )

    # Add foreign key relationship between books and users
    with op.batch_alter_table('books', schema=None) as batch_op:
        batch_op.create_foreign_key('fk_user_book', 'users', ['user_id'], ['id'])

def downgrade():
    # Remove the foreign key constraint from books to users
    with op.batch_alter_table('books', schema=None) as batch_op:
        batch_op.drop_constraint('fk_user_book', type_='foreignkey')  # Drop the foreign key

    # Drop the reviews table
    op.drop_table('reviews')

    # Drop the books table
    op.drop_table('books')

    # Drop the users table
    op.drop_table('users')
