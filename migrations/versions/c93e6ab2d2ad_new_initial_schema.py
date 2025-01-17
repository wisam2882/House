from alembic import op
import sqlalchemy as sa
import os


environment = os.getenv("FLASK_ENV")
SCHEMA = os.environ.get("SCHEMA")

revision = 'new_revision_id'  
down_revision = None 
branch_labels = None
depends_on = None

def upgrade():
    # Create users table first
    op.create_table(
        'users',  # Remove schema for SQLite
        sa.Column('id', sa.Integer, primary_key=True),
        sa.Column('username', sa.String(40), nullable=False),
        sa.Column('email', sa.String(255), nullable=False),
        sa.Column('hashed_password', sa.String(255), nullable=False),
        sa.UniqueConstraint('email'),
        sa.UniqueConstraint('username'),
        sa.Column('createdAt', sa.DateTime(timezone=True), server_default=sa.text('(CURRENT_TIMESTAMP)'), nullable=True)
    )

    # Then create books table with foreign key reference
    op.create_table(
        'books',  # Remove schema for SQLite
        sa.Column('id', sa.Integer, primary_key=True),
        sa.Column('title', sa.String(255), nullable=False),
        sa.Column('author', sa.String(255), nullable=False),
        sa.Column('cover_image', sa.String(255)),
        sa.Column('description', sa.Text),
        sa.Column('genre', sa.String(100)),
        sa.Column('user_id', sa.Integer, sa.ForeignKey('users.id'), nullable=False)  # Ensure users table exists
    )

    # Add any additional tables or constraints as needed

    if environment == "production":
        op.execute(f"ALTER TABLE users SET SCHEMA {SCHEMA};")



def downgrade():
    op.drop_table(f'{SCHEMA}.books')
    op.drop_table(f'{SCHEMA}.users')
