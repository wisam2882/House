"""Fixed circular import issue

Revision ID: 4a5695dac693
Revises: 
Create Date: 2025-01-17 23:22:14.436418

"""
from alembic import op
import sqlalchemy as sa


import os
environment = os.getenv("FLASK_ENV")
SCHEMA = os.environ.get("SCHEMA")

# revision identifiers, used by Alembic.
revision = '4a5695dac693'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('username', sa.String(length=40), nullable=False),
    sa.Column('email', sa.String(length=255), nullable=False),
    sa.Column('hashed_password', sa.String(length=255), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email'),
    sa.UniqueConstraint('username')
    )
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('books',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('title', sa.String(length=255), nullable=False),
        sa.Column('author', sa.String(length=255), nullable=False),
        sa.Column('cover_image', sa.String(length=255), nullable=True),
        sa.Column('description', sa.Text(), nullable=True),
        sa.Column('genre', sa.String(length=100), nullable=True),
        sa.PrimaryKeyConstraint('id')
    )

    op.create_table('reviews',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('book_id', sa.Integer(), nullable=False),
        sa.Column('user_id', sa.Integer(), nullable=False),
        sa.Column('rating', sa.Integer(), nullable=False),
        sa.Column('comment', sa.Text(), nullable=True),
        sa.ForeignKeyConstraint(['book_id'], ['books.id'], ),
        sa.PrimaryKeyConstraint('id')
    )



    op.create_table('user_books',
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('book_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['book_id'], ['books.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('user_id', 'book_id')
    )
    op.create_table('book_reviews',
    sa.Column('book_id', sa.Integer(), nullable=False),
    sa.Column('review_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['book_id'], ['books.id'], ),
    sa.ForeignKeyConstraint(['review_id'], ['reviews.id'], ),
    sa.PrimaryKeyConstraint('book_id', 'review_id')
    )
    # ### end Alembic commands ###


    bind = op.get_bind()
    inspector = Inspector.from_engine(bind)
    columns = [column['name'] for column in inspector.get_columns('books')]
    
    if 'user_id' not in columns:
        with op.batch_alter_table('books', schema=None) as batch_op:
            batch_op.add_column(sa.Column('user_id', sa.Integer(), nullable=False))
            batch_op.create_foreign_key('fk_user_book', 'users', ['user_id'], ['id'])

    op.drop_table('_alembic_tmp_books')  # Comment this out as the table doesn't exist

    with op.batch_alter_table('books', schema=None) as batch_op:
        batch_op.alter_column('user_id',
               existing_type=sa.INTEGER(),
               nullable=False)
        batch_op.create_foreign_key('fk_user_book', 'users', ['user_id'], ['id'])

    if environment == "production":
        op.execute(f"ALTER TABLE users SET SCHEMA {SCHEMA};")  


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('book_reviews')
    op.drop_table('user_books')
    op.drop_table('reviews')
    op.drop_table('books')
    op.drop_table('users')
    # ### end Alembic commands ###
