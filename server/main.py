from fastapi import FastAPI, HTTPException, status, Depends
from fastapi.middleware.cors import CORSMiddleware
from transformers import AutoTokenizer, AutoModelForSeq2SeqLM, pipeline
from datetime import datetime, timedelta
from bson import ObjectId
from typing import List

from models import UserCreate, UserLogin, User, Token, RecipeRequest, RecipeSave, Recipe
from database import users_collection, recipes_collection
from auth import verify_password, get_password_hash, create_access_token, verify_token

app = FastAPI(title="AI Recipe Generator API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],  
    allow_headers=["*"],  
)

model_name = "flax-community/t5-recipe-generation"
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForSeq2SeqLM.from_pretrained(model_name)
generator = pipeline("text2text-generation", model=model, tokenizer=tokenizer)

# Helper function to convert ObjectId to string
def serialize_doc(doc):
    if doc:
        doc["id"] = str(doc["_id"])
        del doc["_id"]
    return doc

# Authentication endpoints
@app.post("/auth/register", response_model=Token)
async def register(user_data: UserCreate):
   
    if users_collection.find_one({"email": user_data.email}):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )
    
    if users_collection.find_one({"username": user_data.username}):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Username already taken"
        )
    
    hashed_password = get_password_hash(user_data.password)
    user_doc = {
        "username": user_data.username,
        "email": user_data.email,
        "password": hashed_password,
        "created_at": datetime.utcnow()
    }
    
    result = users_collection.insert_one(user_doc)
    user_id = str(result.inserted_id)
    
    # Create access token
    access_token = create_access_token(data={"sub": user_id})
    
    return {"access_token": access_token, "token_type": "bearer"}

@app.post("/auth/login", response_model=Token)
async def login(user_data: UserLogin):
    user = users_collection.find_one({"email": user_data.email})
    
    if not user or not verify_password(user_data.password, user["password"]):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password"
        )
    
    access_token = create_access_token(data={"sub": str(user["_id"])})
    return {"access_token": access_token, "token_type": "bearer"}

@app.get("/auth/me", response_model=User)
async def get_current_user(user_id: str = Depends(verify_token)):
    user = users_collection.find_one({"_id": ObjectId(user_id)})
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
    
    return serialize_doc(user)

# Recipe endpoints
@app.post("/generate")
async def generate_recipe(data: RecipeRequest):
    prompt = data.ingredients
    output = generator(prompt, max_new_tokens=200)[0]["generated_text"]
    return {"recipe": output}

@app.post("/recipes/save", response_model=Recipe)
async def save_recipe(recipe_data: RecipeSave, user_id: str = Depends(verify_token)):
    recipe_doc = {
        "user_id": user_id,
        "title": recipe_data.title,
        "ingredients": recipe_data.ingredients,
        "directions": recipe_data.directions,
        "original_ingredients": recipe_data.original_ingredients,
        "created_at": datetime.utcnow()
    }
    
    result = recipes_collection.insert_one(recipe_doc)
    recipe_doc["id"] = str(result.inserted_id)
    del recipe_doc["_id"]
    
    return recipe_doc

@app.get("/recipes", response_model=List[Recipe])
async def get_user_recipes(user_id: str = Depends(verify_token)):
    recipes = list(recipes_collection.find({"user_id": user_id}).sort("created_at", -1))
    return [serialize_doc(recipe) for recipe in recipes]

@app.get("/recipes/{recipe_id}", response_model=Recipe)
async def get_recipe(recipe_id: str, user_id: str = Depends(verify_token)):
    try:
        recipe = recipes_collection.find_one({
            "_id": ObjectId(recipe_id),
            "user_id": user_id
        })
        
        if not recipe:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Recipe not found"
            )
        
        return serialize_doc(recipe)
    except:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid recipe ID"
        )

@app.delete("/recipes/{recipe_id}")
async def delete_recipe(recipe_id: str, user_id: str = Depends(verify_token)):
    try:
        result = recipes_collection.delete_one({
            "_id": ObjectId(recipe_id),
            "user_id": user_id
        })
        
        if result.deleted_count == 0:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Recipe not found"
            )
        
        return {"message": "Recipe deleted successfully"}
    except:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid recipe ID"
        )

@app.get("/")
async def root():
    return {"message": "AI Recipe Generator API is running!"}
