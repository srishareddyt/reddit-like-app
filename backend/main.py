from fastapi import FastAPI
from params import *
from fastapi.responses import JSONResponse
from user import User
from post import Post
from comment import Comment
from database import db
from fastapi.encoders import jsonable_encoder
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Replace with the actual allowed origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event('startup')
def startup():
    db.connect()
    # db.create_tables([User, Post, Comment])

@app.on_event('shutdown')
def shutdown():
    db.close()

@app.get("/")
def read_root():
    return "WELCOME TO REDDIT"

@app.post("/create_user")
def create_user(request: CreateUser):
    user = User.create(name = request.name, email = request.email, password = request.password)
    user_id = {"id": str(user)}
    return JSONResponse(status_code=200, content = user_id)

@app.get("/get_user")
def get_user(email: str,password: str):
    user = User.select(User.id, User.name).where(User.email == email, User.password == password).first()
    if user:
        return JSONResponse(status_code=200, content = {"id" : str(user.id), "name" : user.name})
    else:
        return JSONResponse(status_code=404, content = "email or password is wrong")
    
@app.post("/create_post")
def create_post(request: CreatePost):
    id = Post.create(user_id = request.user_id, title = request.title, content = request.content)
    return JSONResponse(status_code=200, content = {"id" : str(id)})

@app.post("/create_comment")
def create_comment(request: CreateComment):
    id = Comment.create(post_id = request.post_id, parent_id = request.parent_id, user_id = request.user_id, content = request.content)
    return JSONResponse(status_code=200, content = {"id" : str(id)})

@app.post("/like_post")
def like_post(post_id: str):
    post = Post.select().where(Post.id == post_id).first()
    post.likes_count = int(post.likes_count) + 1
    post.save()
    return JSONResponse(status_code=200, content = "Liked")

@app.get("/list_all_posts")
def list_all_posts():
    query = Post.select()
    data = [{'id': str(post.id), 'title': post.title, 'content': post.content, 'likes_count': post.likes_count, 'created_at': str(post.created_at)[:16], 'user_name': post.user_id} for post in query]
    for d in data:
        d["user_name"] =  User.select(User.name).where(User.id == d["user_name"]).first().name
    return JSONResponse(status_code=200, content = data)

@app.get("/get_post")
def get_post(post_id: str):
    post = Post.select().where(Post.id == post_id).first()
    def build_comment_tree(parent_id=None):
        comments = Comment.select().where(Comment.parent_id == parent_id, Comment.post_id == post_id).order_by(Comment.created_at.asc()).dicts()
        nested_comments = []
        for comment in comments:
            comment_data = comment
            comment_data["user_name"] = User.select(User.name).where(User.id == comment["user_id"]).first().name
            comment_data["children"] = build_comment_tree(comment["id"])
            nested_comments.append(comment_data)
        return nested_comments

    all_comments = build_comment_tree()
    post_data = {'id': str(post.id), 'title': post.title, 'content': post.content, 'likes_count': post.likes_count}
    post_data["user_name"] =  User.select(User.name).where(User.id == post.user_id).first().name
    return JSONResponse(
        status_code=200,
        content={
            "post": post_data,
            "comments": jsonable_encoder(all_comments),
        }
    )