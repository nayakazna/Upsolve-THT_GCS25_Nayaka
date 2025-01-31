from typing import List
from fastapi import FastAPI, status, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from db import SessionLocal, engine
from sqlalchemy import exc
from uuid import UUID
from datetime import datetime

import models

app = FastAPI()

# Configure CORS
origins = [
    "http://localhost:5173",
    "http://localhost:8000",
    "http://127.0.0.1:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Item(BaseModel):
    """item model for fastapi"""
    id: UUID 
    name: str
    description: str
    created_at: datetime
    class Config:
        """required for sqlalchemy"""
        orm_mode = True

class ItemUpdate(BaseModel):
    """item model for update requests (excludes created_at)"""
    name: str
    description: str

    class Config:
        orm_mode = True

db = SessionLocal()

def configure_database():
    """Configure PostgreSQL database"""
    with engine.connect() as connection:
        connection.execute("CREATE EXTENSION IF NOT EXISTS \"uuid-ossp\";")
        connection.execute("ALTER TABLE items ALTER COLUMN id SET DEFAULT uuid_generate_v4();")
        connection.execute("ALTER TABLE items ALTER COLUMN created_at SET DEFAULT CURRENT_TIMESTAMP;")

@app.on_event("startup")
def configure():
    """CREATE DB"""
    print("🍍 CREATING DB...")
    models.Base.metadata.create_all(bind=engine)
    configure_database()

@app.get("/items", response_model=List[Item], status_code=status.HTTP_200_OK)
async def get_items():
    """get all items"""
    items = db.query(models.Item).all()
    return items

@app.get("/items/{id}", response_model=Item, status_code=status.HTTP_200_OK)
async def get_item(id: str):
    """get one item"""
    item = db.query(models.Item).filter(models.Item.id == id).first()
    if item is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Item not found")
    return item

@app.post("/items", response_model=Item, status_code=status.HTTP_201_CREATED)
async def create_item(item: Item):
    """create an item"""
    new_item = models.Item(name=item.name, description=item.description)
    db.add(new_item)
    db.commit()
    db.refresh(new_item)
    return new_item

@app.put("/items/{id}", response_model=Item, status_code=status.HTTP_200_OK)
async def update_item(id: str, item: ItemUpdate):
    """update an item"""
    item_to_update = db.query(models.Item).filter(models.Item.id == id).first()
    if item_to_update is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Item not found")

    item_to_update.name = item.name
    item_to_update.description = item.description

    db.commit()
    db.refresh(item_to_update)
    return item_to_update

@app.delete("/items/{id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_item(id: str):
    """delete an item"""
    item_to_delete = db.query(models.Item).filter(models.Item.id == id).first()
    if item_to_delete is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Item not found")

    db.delete(item_to_delete)
    db.commit()
    return None