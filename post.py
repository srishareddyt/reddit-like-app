from peewee import * 
from database import db
import datetime

class BaseModel(Model):
    class Meta:
        database = db
        only_save_dirty = True

class Post(BaseModel):
    id = UUIDField(constraints=[SQL("DEFAULT gen_random_uuid()")], primary_key=True)
    user_id = CharField()
    title = CharField()
    content = CharField()
    created_at = DateTimeField(default=datetime.datetime.now)
    likes_count = CharField(null=True, default = 0)

    def save(self, *args, **kwargs):
        return super(Post, self).save(*args, **kwargs)
    
    class Meta:
        table_name = 'posts'