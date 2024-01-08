from peewee import *
db = PostgresqlDatabase('reddit', user='newuser', password='password', host='localhost', port = 5432)

# db.create_tables([User, Post, Comment])