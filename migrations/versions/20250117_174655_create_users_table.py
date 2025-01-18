"""Create users table

Revision ID: 6e71608f0f9f
Revises: e145c6a0a3ba
Create Date: 2025-01-17 17:46:55.882302

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '6e71608f0f9f'
down_revision = 'e145c6a0a3ba'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###

    # op.drop_table('_alembic_tmp_books')  # Comment this out as the table doesn't exist

    with op.batch_alter_table('books', schema=None) as batch_op:
        batch_op.alter_column('user_id',
               existing_type=sa.INTEGER(),
               nullable=False)
        batch_op.create_foreign_key('fk_user_book', 'users', ['user_id'], ['id'])

    # ### end Alembic commands ###


    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('books', schema=None) as batch_op:
        batch_op.drop_constraint(None, type_='foreignkey')
        batch_op.alter_column('user_id',
               existing_type=sa.INTEGER(),
               nullable=True)

    op.create_table('_alembic_tmp_books',
    sa.Column('id', sa.INTEGER(), nullable=False),
    sa.Column('title', sa.VARCHAR(length=255), nullable=False),
    sa.Column('author', sa.VARCHAR(length=255), nullable=False),
    sa.Column('cover_image', sa.VARCHAR(length=255), nullable=True),
    sa.Column('description', sa.TEXT(), nullable=True),
    sa.Column('genre', sa.VARCHAR(length=100), nullable=True),
    sa.Column('user_id', sa.INTEGER(), nullable=False),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], name='fk_user_book'),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###
