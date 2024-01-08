from pydantic import BaseModel

class CreateUser(BaseModel):
    name: str
    email: str
    password: str

class GetUser(BaseModel):
    email: str
    password: str

class CreatePost(BaseModel):
    user_id: str
    title: str
    content: str

class CreateComment(BaseModel):
    post_id: str
    parent_id: str = None
    user_id: str
    content: str