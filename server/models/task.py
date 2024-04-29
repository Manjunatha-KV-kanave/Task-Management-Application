from pydantic import BaseModel
from datetime import datetime
from typing import Optional

# Define Pydantic models for Task
class TaskBase(BaseModel):
    title: str
    description: Optional[str] = None
    due_date: datetime
    completion: Optional[bool] = False

class TaskCreate(TaskBase):
    pass

class TaskUpdate(TaskBase):
    pass

class Task(TaskBase):
    id: int

    class Config:
        orm_mode = True
