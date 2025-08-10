from database import database, users_collection, recipes_collection
from pymongo import IndexModel, ASCENDING

def setup_database():
    """Create indexes for better performance"""
    
    # Create indexes for users collection
    users_indexes = [
        IndexModel([("email", ASCENDING)], unique=True),
        IndexModel([("username", ASCENDING)], unique=True)
    ]
    users_collection.create_indexes(users_indexes)
    
    # Create indexes for recipes collection
    recipes_indexes = [
        IndexModel([("user_id", ASCENDING)]),
        IndexModel([("created_at", ASCENDING)])
    ]
    recipes_collection.create_indexes(recipes_indexes)
    
    print("Database setup completed!")
    print(f"Database: {database.name}")
    print(f"Collections: {database.list_collection_names()}")

if __name__ == "__main__":
    setup_database()