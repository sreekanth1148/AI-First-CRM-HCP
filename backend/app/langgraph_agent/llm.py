import os
from dotenv import load_dotenv
from langchain_groq import ChatGroq

load_dotenv()

GROQ_API_KEY = os.getenv("GROQ_API_KEY")
MODEL_NAME = os.getenv("MODEL_NAME", "llama-3.3-70b-versatile")

print("================================")
print("GROQ KEY FOUND:", GROQ_API_KEY is not None)
print("MODEL:", MODEL_NAME)

if GROQ_API_KEY:
    print("KEY STARTS WITH:", GROQ_API_KEY[:8])
else:
    print("NO API KEY FOUND")

print("================================")

llm = ChatGroq(
    api_key=GROQ_API_KEY,
    model=MODEL_NAME,
    temperature=0.2,
)