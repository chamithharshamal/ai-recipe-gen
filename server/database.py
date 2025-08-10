from pymongo import MongoClient
from dotenv import load_dotenv
import os

load_dotenv()

MONGODB_URL = os.getenv("MONGODB_URL", "mongodb://localhost:27017")
DATABASE_NAME = "ai_recipe_gen"

client = MongoClient(MONGODB_URL)
database = client[DATABASE_NAME]

# Collections
users_collection = database["users"]
recipes_collection = database["recipes"]

def get_database():
    return database