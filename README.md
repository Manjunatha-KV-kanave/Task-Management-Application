# Task Management Application

This is a Task Management Application built using FastAPI, SQLAlchemy, and SQLite. It allows users to create, list, update, and delete tasks, with features such as task creation, listing, completion status update, and filtering.

## Features

1. **Task Creation**: Users can create tasks with a title, description, and due date.
2. **Task Listing**: Users can view a list of tasks showing titles, due dates, and completion status.
3. **Task Completion**: Users can mark tasks as completed.
4. **Task Filtering**: Users can filter tasks based on due dates and completion status.
5. **Database Integration**: Task data is stored in an SQLite database.
6. **API Development**: A FastAPI web service is created to interact with the task data.

## Technologies Used

- **FastAPI**: FastAPI is a modern, fast (high-performance) web framework for building APIs with Python 3.7+ based on standard Python type hints.
- **SQLAlchemy**: SQLAlchemy is a SQL toolkit and Object-Relational Mapping (ORM) library for Python. It provides a full suite of well-known enterprise-level persistence patterns, designed for efficient and high-performing database access.
- **SQLite**: SQLite is a C-language library that implements a small, fast, self-contained, high-reliability, full-featured, SQL database engine.
- **Python 3.x**: Python is a high-level, interpreted programming language known for its simplicity and readability.

## Project Structure

```
/--/client
|  |-- index.html
|  |-- script.js
|-- /server
|   |-- /models
|   |   |-- task.py
|   |-- /routes
|   |   |-- task_routes.py
|   |-- /utils
|   |   |-- database.py
|   |-- main.py
|-- README.md
```

## Usage

1. Clone the repository:
   ```bash
   git clone https://github.com/isaac0yen/Python-CRUD.git
   ```

2. Install dependencies:
   ```bash
   cd server
   pip install fastapi uvicorn sqlalchemy
   ```

3. Run the server application:
   ```bash
   uvicorn main:app --reload
   ```
4. Run the client by opening the index.html file on a browser



## Client
The client-side was built with HTML, CSS and Javascript.
It communicates with the server via http://localhost:8000 and it's various routes.
It used CSS the following libaraies => Bootstrap W3CSS and tailwind.
