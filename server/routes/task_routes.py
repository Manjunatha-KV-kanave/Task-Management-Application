from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from datetime import datetime
from models.task import Task, TaskCreate, TaskUpdate
from utils.database import SessionLocal, Task as DBTask

router = APIRouter()

# Dependency for accessing the database session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/tasks/", response_model=Task)
def create_task(task_data: TaskCreate, db: Session = Depends(get_db)):
    try:
        db_task = DBTask(**task_data.dict())
        db.add(db_task)
        db.commit()
        db.refresh(db_task)
        return db_task
    except Exception as e:
        print(e)
        db.rollback()
        raise HTTPException(status_code=500, detail="Error creating task")

@router.get("/tasks/", response_model=list[Task])
def list_tasks(due_date: datetime = None, completion: bool = None, db: Session = Depends(get_db)):
    query = db.query(DBTask)
    if due_date:
        query = query.filter(DBTask.due_date == due_date)
    if completion is not None:
        query = query.filter(DBTask.completion == completion)
    return query.all()

@router.put("/tasks/{task_id}", response_model=Task)
def update_task(task_id: int, task_data: TaskUpdate, db: Session = Depends(get_db)):
    db_task = db.query(DBTask).filter(DBTask.id == task_id).first()
    if db_task is None:
        raise HTTPException(status_code=404, detail="Task not found")
    for key, value in task_data.dict().items():
        setattr(db_task, key, value)
    db.commit()
    db.refresh(db_task)
    return db_task

@router.delete("/tasks/{task_id}")
def delete_task(task_id: int, db: Session = Depends(get_db)):
    db_task = db.query(DBTask).filter(DBTask.id == task_id).first()
    if db_task is None:
        raise HTTPException(status_code=404, detail="Task not found")
    db.delete(db_task)
    db.commit()
    return {"message": "Task deleted successfully"}
