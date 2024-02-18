from pydantic import BaseModel
from datetime import date


class SignUpSchema(BaseModel):
    email:str
    first_name:str
    last_name:str
    password:str
    date_of_birth:date
    gender:str
    
class aiSchema(BaseModel):
    prompt : str
    model : str
    max_tokens : int
    temperature : float
    top_k : int
    top_p : float
    repetition_penalty : float
    stop : list[str]

class LoginSchema(BaseModel):
    email:str
    password:str

class EmailSchema(BaseModel):
    email:str

class LatexDocSchema(BaseModel):
    latex: str
    
class SearchSchema(BaseModel):
    query:str

