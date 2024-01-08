from peewee import * 
from database import db

class BaseModel(Model):
    class Meta:
        database = db
        only_save_dirty = True

class User(BaseModel):
    id = UUIDField(constraints=[SQL("DEFAULT gen_random_uuid()")], primary_key=True)
    name = CharField()
    email = CharField()
    password = CharField()

    def save(self, *args, **kwargs):
        return super(User, self).save(*args, **kwargs)
    
    class Meta:
        table_name = 'users'