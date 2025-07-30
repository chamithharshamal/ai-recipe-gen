from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from transformers import AutoTokenizer, AutoModelForSeq2SeqLM, pipeline

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

model_name = "flax-community/t5-recipe-generation"
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForSeq2SeqLM.from_pretrained(model_name)
generator = pipeline("text2text-generation", model=model, tokenizer=tokenizer)

class RecipeRequest(BaseModel):
    ingredients: str

@app.post("/generate")
async def generate_recipe(data: RecipeRequest):
    prompt = data.ingredients
    output = generator(prompt, max_new_tokens=200)[0]["generated_text"]
    return {"recipe": output}
