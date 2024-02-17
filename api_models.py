from pydantic import BaseModel
from datetime import date


class SignUpSchema(BaseModel):
    email:str
    first_name:str
    last_name:str
    password:str
    date_of_birth:date
    gender:str

class LoginSchema(BaseModel):
    email:str
    password:str

class EmailSchema(BaseModel):
    email:str