from .database import Base
from sqlalchemy import Column, Integer, String, TIMESTAMP, Boolean, text


class Users(Base):
    __tablename__ = "users"

    email = Column(String,primary_key=True,nullable=False)
    uid = Column(String,nullable=False)
    first_name = Column(String,nullable=False)
    last_name = Column(String,nullable=False)
    date_of_birth = Column(TIMESTAMP(timezone=True),nullable=False)
    gender = Column(String,nullable=False)
    created_at = Column(TIMESTAMP(timezone=True), server_default=text('now()'))