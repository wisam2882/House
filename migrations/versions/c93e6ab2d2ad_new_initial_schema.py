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
    # First create the 'users' table
    op.create_table(
        'users',
        sa.Column('id', sa.Integer, primary_key=True),
        sa.Column('username', sa.String(40), nullable=False),
        sa.Column('email', sa.String(255), nullable=False),
        sa.Column('hashed_password', sa.String(255), nullable=False),
    )
    
    # Now create the 'books' table
    op.create_table(
        'books',
        sa.Column('id', sa.Integer, primary_key=True),
        sa.Column('title', sa.String(255), nullable=False),
        sa.Column('author', sa.String(255), nullable=False),
        sa.Column('cover_image', sa.String(255)),
        sa.Column('description', sa.Text),
        sa.Column('genre', sa.String(100)),
        sa.Column('user_id', sa.Integer, sa.ForeignKey('users.id'), nullable=False)
    )

    # Create other tables as necessary...

def downgrade():
    op.drop_table('books')
    op.drop_table('users')
