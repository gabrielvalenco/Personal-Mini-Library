# Personal Mini Library - Django + React Project

## Description

A simple web application designed to help users catalog and review their personal book collections. This project is built using Django and Django REST Framework for the backend API, and React.js for the frontend user interface. It serves as a practical example demonstrating the implementation of various database relationships (N:N, 1:N, N:1) within a full-stack application.

## Features

*   **Backend (Django):**
    *   RESTful API endpoints for CRUD operations on Users, Categories, Authors, Books, and Reviews.
    *   Database models representing the core entities.
    *   Admin interface for basic data management.
    *   Serialization of data for API responses.
*   **Frontend (React):**
    *   Display a list of all books with details (title, category, authors).
    *   View detailed information for a single book, including user reviews.
    *   Forms to add/edit books, including selecting categories and multiple authors.
    *   Management interfaces for authors and categories.
    *   Functionality to add reviews (rating and comments) to books.
    *   Routing for navigating between different application views.

## Data Model

The application utilizes the following 5 database tables (Django models):

1.  **User:** Represents a user who submits a review.
    *   Fields: `id` (PK), `username` (CharField).
2.  **Category:** Represents the genre or category of a book (e.g., Science Fiction, Romance, Technical).
    *   Fields: `id` (PK), `name` (CharField).
3.  **Author:** Represents the author of a book.
    *   Fields: `id` (PK), `name` (CharField).
4.  **Book:** Represents a book in the library.
    *   Fields: `id` (PK), `title` (CharField), `publication_year` (IntegerField, optional).
    *   Relationships:
        *   `category` (ForeignKey to Category): A book belongs to one category; a category can have many books. **(N:1 Relationship)**
        *   `authors` (ManyToManyField to Author): A book can have multiple authors; an author can write multiple books. **(N:N Relationship)**
5.  **Review:** Represents a review (rating and comment) for a book.
    *   Fields: `id` (PK), `rating` (IntegerField, e.g., 1-5), `comment` (TextField).
    *   Relationships:
        *   `book` (ForeignKey to Book): A review belongs to one book; a book can have many reviews. **(1:N Relationship from Book's perspective)**
        *   `user` (ForeignKey to User): A review is submitted by one user; a user can submit many reviews.

## Setup and Running (Placeholder)

**Backend (Django):**

```bash
# 1. Clone the repository (replace with actual repo URL)
# git clone <repository_url>
# cd backend_directory

# 2. Create and activate a virtual environment
# python -m venv venv
# source venv/bin/activate  # On Windows use `venv\Scripts\activate`

# 3. Install dependencies
# pip install -r requirements.txt

# 4. Apply database migrations
# python manage.py migrate

# 5. Create a superuser for the admin interface (optional)
# python manage.py createsuperuser

# 6. Start the Django development server
# python manage.py runserver
```

**Frontend (React):**

```bash
# 1. Navigate to the frontend directory
# cd ../frontend_directory

# 2. Install dependencies
# npm install  # or yarn install

# 3. Start the React development server
# npm start    # or yarn start
```

Access the application in your browser, typically at `http://localhost:3000` for React and the API at `http://localhost:8000/api/`.
