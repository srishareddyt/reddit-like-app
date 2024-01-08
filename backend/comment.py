from peewee import * 
from database import db
import datetime

class BaseModel(Model):
    class Meta:
        database = db
        only_save_dirty = True

class Comment(BaseModel):
    id = UUIDField(constraints=[SQL("DEFAULT gen_random_uuid()")], primary_key=True)
    post_id = CharField()
    parent_id = CharField(null=True, default=None)
    user_id = CharField()
    content = CharField()
    created_at = DateTimeField(default=datetime.datetime.now)

    def save(self, *args, **kwargs):
        return super(Comment, self).save(*args, **kwargs)
    
    class Meta:
        table_name = 'comments'