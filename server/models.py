from pydantic import BaseModel, EmailStr
from typing import Optional, List
from datetime import datetime

class UserCreate(BaseModel):
    username: str
    email: EmailStr
    password: str

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class User(BaseModel):
    id: Optional[str] = None
    username: str
    email: EmailStr
    created_at: Optional[datetime] = None

class Token(BaseModel):
    access_token: str
    token_type: str

class RecipeRequest(BaseModel):
    ingredients: str

class RecipeSave(BaseModel):
    title: str
    ingredients: List[str]
    directions: List[str]
    original_ingredients: str

class Recipe(BaseModel):
    id: Optional[str] = None
    user_id: str
    title: str
    ingredients: List[str]
    directions: List[str]
    original_ingredients: str
    created_at: Optional[datetime] = None