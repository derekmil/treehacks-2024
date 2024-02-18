from fastapi import FastAPI, HTTPException, Depends, Response, File, UploadFile, Body
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse, FileResponse
from fastapi.exceptions import HTTPException
from fastapi.requests import Request
import backend.sql.models as models
from backend.sql.database import SessionLocal, engine
from sqlalchemy.orm import Session
from pydantic import BaseModel
from typing import Annotated
from backend.sql.database import get_db
import firebase_admin
from firebase_admin import credentials, auth
from dotenv import load_dotenv
import os
# import pyrebase

from backend.api_models import SignUpSchema, LoginSchema, EmailSchema, LatexDocSchema, aiSchema

from sqlalchemy.exc import IntegrityError
import subprocess
import secrets
import string
import together


load_dotenv(dotenv_path='.env')



app = FastAPI()
models.Base.metadata.create_all(bind=engine)

db_dependency = Annotated[Session, Depends(get_db)]

origins = [
    "http://localhost:5173",
    "*"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
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

# firebase = pyrebase.initialize_app(FIREBASE_CONFIG)

#######################################################
#                                                     #
#                        FUNCS                        #
#                                                     #
#######################################################

def generate_random_string(length=8):
    characters = string.ascii_letters + string.digits
    return ''.join(secrets.choice(characters) for _ in range(length))


#######################################################
#                                                     #
#                       ROUTES                        #
#                                                     #
#######################################################

@app.post('/ai/')
async def ai_complete(request: aiSchema):
    print("here")
    
    together.api_key = "100d954a690d242c16700cd8efb3c830592b37edc5423095192020e1d6724f03"
    
    systemMessage = "[INST]  You are a copilot tool to help users write latex syntax. I need you to only respond in latex code if you write an english word you will be punished. You are given an input which is a comment given by the user. Assume the the latex framework is in place.\n Response: {one line of latex code} "
    prompt = request.prompt

    question = systemMessage + prompt

    question += "\n [/INST]"
    
    print("prompt", question)

    output = together.Complete.create(
    prompt = question, 
    model = "wdevoest@umich.edu/CodeLlama-13b-Instruct-2024-02-17-22-52-21", 
    max_tokens = 500,
    temperature = 0.0,
    top_k = 50,
    top_p = 0.4,
    repetition_penalty = 1,
    stop = ['</s>,[INST]']
    )
    
    return JSONResponse(
        content={
            "text": output['output']['choices'][0]['text'] 
            },
        status_code=200
    )


@app.post("/api/render-latex/")
async def render_latex(request: LatexDocSchema):
    latex = request.latex
    unsanitized_latex_content = latex.replace('\\\\', '\\')

    tag = generate_random_string()
    root_dir = "/Users/wdevoest/Documents/treehacks-2024"
    render_dir = f"backend/render_dir"
    os.system(f"rm {render_dir}/*")

    os.makedirs(f"{root_dir}/{render_dir}", exist_ok=True)
    file_path = os.path.join(f"{root_dir}/{render_dir}", f"{tag}.tex")
    with open(file_path, "w") as file_object:
        file_object.write(unsanitized_latex_content)
    try:
        compile_command = [
            "docker", "run", "--rm",
            "-v", f"{root_dir}/{render_dir}:/workdir",
            "texlive/texlive", "pdflatex", f"{tag}.tex"
        ]
        result = subprocess.run(compile_command, cwd=f"{root_dir}/{render_dir}/", capture_output=True, text=True)
        if result.returncode != 0:
            raise HTTPException(status_code=501, detail=result.stderr)
# docker run --rm -v /Users/derekmiller/Documents/sideproj/treehacks-2024/backend/render_dir:/workdir texlive/texlive pdflatex test.tex

    except Exception as e:
        print("something", e)
        raise HTTPException(status_code=500, detail=str(e))
    response = FileResponse(f"{root_dir}/{render_dir}/{tag}.pdf")
    
    return response


@app.post('/createaccount/')
async def create_account(udata: SignUpSchema, db: db_dependency):
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
