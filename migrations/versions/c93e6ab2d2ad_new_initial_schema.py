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
  
    op.create_table(
        f'{SCHEMA}.users',  
        sa.Column('id', sa.Integer, primary_key=True),
        sa.Column('username', sa.String(40), nullable=False),
        sa.Column('email', sa.String(255), nullable=False),
        sa.Column('hashed_password', sa.String(255), nullable=False),
    )

 
    op.create_table(
        f'{SCHEMA}.books',  
        sa.Column('id', sa.Integer, primary_key=True),
        sa.Column('title', sa.String(255), nullable=False),
        sa.Column('author', sa.String(255), nullable=False),
        sa.Column('cover_image', sa.String(255)),
        sa.Column('description', sa.Text),
        sa.Column('genre', sa.String(100)),
        sa.Column('user_id', sa.Integer, sa.ForeignKey(f'{SCHEMA}.users.id'), nullable=False) 
    )



def downgrade():
    op.drop_table(f'{SCHEMA}.books')
    op.drop_table(f'{SCHEMA}.users')
