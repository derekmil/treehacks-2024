from fastapi import FastAPI, HTTPException, Depends, Response
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from fastapi.exceptions import HTTPException
from fastapi.requests import Request
import sql.models as models
from sql.database import SessionLocal, engine
from sqlalchemy.orm import Session
from pydantic import BaseModel
from typing import Annotated
from sql.database import get_db
import firebase_admin
from firebase_admin import credentials, auth
from dotenv import load_dotenv
import os
import pyrebase
from api_models import SignUpSchema, LoginSchema, EmailSchema
from sqlalchemy.exc import IntegrityError

load_dotenv(dotenv_path='.env')



app = FastAPI()
models.Base.metadata.create_all(bind=engine)

db_dependency = Annotated[Session, Depends(get_db)]

origins = [
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

if not firebase_admin._apps:
    cred = credentials.Certificate(os.getenv("SERVICE_ACCOUNT_KEY"))
    firebase_admin.initialize_app(cred)

FIREBASE_CONFIG = {
    "apiKey": os.getenv('FIREBASE_APIKEY'),
    "authDomain": os.getenv('FIREBASE_AUTHDOMAIN'),
    "projectId": os.getenv('FIREBASE_PROJECTID'),
    "storageBucket": os.getenv('FIREBASE_STORAGEBUCKET'),
    "messagingSenderId": os.getenv('FIREBASE_MESSAGINGSENDERID'),
    "appId": os.getenv('FIREBASE_APPID'),
    "databaseURL": os.getenv('FIREBASE_DATABASEURL')
}

firebase = pyrebase.initialize_app(FIREBASE_CONFIG)



#######################################################
#                                                     #
#                       ROUTES                        #
#                                                     #
#######################################################


@app.get("/render-latex/")
async def read_item(item_id: int):
    return {"message": f"yo shit was successful {item_id}"}

@app.post('/createaccount/')
async def create_account(udata: SignUpSchema, db: db_dependency):
    print("hello")

    try:
        if db.query(models.Users).filter(models.Users.email == udata.email).first() is not None:
            raise IntegrityError

        user = auth.create_user(
            email=udata.email,
            password=udata.password,
        )

        db_user = models.Users(
            email=udata.email,
            uid=user.uid,
            first_name=udata.first_name,
            last_name=udata.last_name,
            date_of_birth=udata.date_of_birth,
            gender=udata.gender
        )
        

        db.add(db_user)
        db.commit()

        return JSONResponse(
            content={"message" : f"User account created successfuly for user {user.uid}"},
            status_code=201
            )
    except (auth.EmailAlreadyExistsError, IntegrityError):
        raise HTTPException(
            status_code=400,
            detail= f"Account already created for the email {udata.email}"
        )

@app.post('/login')
async def login(user_data: LoginSchema, response:Response):
    email = user_data.email
    password = user_data.password
    try:
        user = firebase.auth().sign_in_with_email_and_password(
            email = email,
            password = password
        )

        token = user['idToken']

        print(token)
        response.set_cookie(key="jwt", value=token, httponly=True, secure=True, samesite='Lax')

        return JSONResponse(
            content={
                "token":token
            },status_code=200
        )

    except:
        raise HTTPException(
            status_code=400,detail="Invalid Credentials"
        )
    
@app.post('/ping')
async def validate_token(request:Request):

    headers = request.headers
    jwt = headers.get('authorization')

    user = auth.verify_id_token(jwt, check_revoked=True)

    return user["user_id"]

@app.post('/checkemail')
async def check_email(email_data:EmailSchema, db: db_dependency):
    if db.query(models.Users).filter(models.Users.email == email_data.email).first() is not None:
        return JSONResponse(
            content={
                "message":"Email already exists",
                "exists":True
            },status_code=200
        )
    else:
        return JSONResponse(
            content={
                "message":"Email is available",
                "exists":False
            },status_code=200
        )
