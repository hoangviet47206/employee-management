# 👨‍💼 Employee Management System

A modern full-stack Employee Management web application built with **Node.js, Express, EJS, MySQL, and Docker**.

The project includes **authentication, role-based access control, employee CRUD operations, cloud deployment, Docker support, responsive UI, animated landing page, toast notifications, and custom error pages**.

---

## 🌐 Live Demo

https://employee-management-od9a.onrender.com

> ⚠️ The application is hosted on Render Free, so the first request after a period of inactivity may take some time to load.

---

## ✨ Overview

The application is designed as a complete employee management system with a public landing page and a protected management dashboard.

Main application flow:

```text
Welcome Page
     ↓
Login / Register
     ↓
Authentication
     ↓
Employee Dashboard
     ↓
Role-Based Actions
```

Main routes:

```text
/             → Welcome Page
/login        → Login
/register     → Register
/employees    → Employee Dashboard
```

---

## 🚀 Features

### 🌐 Welcome Landing Page

- Modern animated landing page
- Project overview
- Technology stack preview
- Developer introduction
- Login and Register navigation
- Dynamic navigation for authenticated users
- Animated background and dashboard preview

### 🔐 Authentication

- User registration
- User login
- User logout
- Session-based authentication
- Password hashing with bcrypt
- Inline authentication error messages
- Registration success notification

### 🛡️ Role-Based Access Control

The application supports three roles:

| Feature | 👤 Employee | 🧑‍💼 Manager | 👑 Admin |
|---|---:|---:|---:|
| View employees | ✅ | ✅ | ✅ |
| Search / Filter | ✅ | ✅ | ✅ |
| Add employee | ❌ | ✅ | ✅ |
| Update employee | ❌ | ✅ | ✅ |
| Delete employee | ❌ | ❌ | ✅ |

Authorization is enforced on the **backend**, not only through the interface.

---

## 📋 Employee Management

The dashboard supports:

- 👀 View employees
- 🔎 Search by first name
- 🔎 Search by last name
- 🔎 Filter by job title
- 📄 Pagination
- ➕ Add employees
- ✏️ Update employee information
- 🗑️ Delete employees
- 🔄 Safe handling of related records during deletion

---

## 🎨 User Interface

The application includes a redesigned modern dashboard interface.

### UI Features

- Responsive layout
- Glass-style cards
- Animated background
- Smooth page transitions
- Hover animations
- Animated dashboard preview
- Loading states on buttons
- Toast notifications
- Custom delete confirmation modal
- Responsive mobile layout
- Consistent visual design across all pages

### 🔔 Toast Notifications

Successful actions display notifications such as:

```text
✓ Employee added successfully.
✓ Employee updated successfully.
✓ Employee deleted successfully.
```

Failed operations display an error toast instead of raw browser messages.

---

## ⚠️ Custom Error Pages

The project includes custom pages for common application errors:

```text
403 → Access Denied
404 → Page Not Found
500 → Internal Server Error
```

Each error page includes:

- Consistent application branding
- Animated background
- Error description
- Back to Dashboard button
- Go Back action

---

## 🛠️ Tech Stack

### ⚙️ Backend

- Node.js
- Express.js
- express-session
- bcrypt
- mysql2

### 🎨 Frontend

- EJS
- HTML
- CSS
- JavaScript

### 🗄️ Database

- MySQL

### 🐳 Containerization

- Docker

### ☁️ Cloud

- Render
- Aiven MySQL

### 🌿 Version Control

- Git
- GitHub

---

## 📁 Project Structure

```text
employee-management/
├── controllers/
│   ├── authController.js
│   └── employeeController.js
│
├── middleware/
│   ├── authMiddleware.js
│   └── roleMiddleware.js
│
├── models/
│   ├── pool.js
│   ├── queries.js
│   └── userQueries.js
│
├── public/
│   ├── scripts/
│   │   └── employee-page.js
│   │
│   └── styles/
│       ├── auth.css
│       ├── employee-page.css
│       ├── error-page.css
│       └── welcome.css
│
├── routes/
│   ├── authRouter.js
│   └── employeeRouter.js
│
├── views/
│   ├── employee-page.ejs
│   ├── error-page.ejs
│   ├── login.ejs
│   ├── register.ejs
│   └── welcome.ejs
│
├── app.js
├── Dockerfile
├── .dockerignore
├── .env.example
├── package.json
└── README.md
```

---

## 🗃️ Database

The project uses the MySQL `classicmodels` database with an additional `users` table for authentication and authorization.

Important tables include:

```text
employees
customers
offices
users
```

The `users` table stores:

- username
- email
- hashed password
- user role
- linked employee ID

Available roles:

```text
employee
manager
admin
```

---

## 🔒 Security

The project currently includes several security mechanisms:

- 🔑 Password hashing with bcrypt
- 🍪 Session-based authentication
- 🚧 Protected routes
- 🛡️ Role-based authorization middleware
- 💉 Parameterized SQL queries
- 🔐 Environment variables for secrets and credentials
- 🔒 SSL connection to the production MySQL database
- 🔁 Session regeneration after successful login
- ⚠️ Custom authorization error handling

The backend independently verifies user roles, so modifying frontend elements does not grant additional privileges.

---

## 🚀 Installation

### 1. Clone the repository

```bash
git clone https://github.com/hoangviet47206/employee-management.git
```

```bash
cd employee-management
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file:

```env
PORT=8000

DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=classicmodels
DB_SSL=false

SESSION_SECRET=your_session_secret
```

> 🔐 Never commit `.env` to GitHub.

---

## ▶️ Run Locally

Start the application:

```bash
npm start
```

Or:

```bash
node app.js
```

For development with automatic restart:

```bash
node --watch app.js
```

Open:

```text
http://localhost:8000
```

---

## 🐳 Docker

The application can also run inside a Docker container.

### Build the Docker image

```bash
docker build -t employee-management .
```

### Run the container

```bash
docker run --env-file .env -p 8000:8000 employee-management
```

Then open:

```text
http://localhost:8000
```

### Docker Workflow

```text
Source Code
    ↓
Dockerfile
    ↓
Docker Image
    ↓
employee-management
    ↓
Docker Container
    ↓
Node.js Application
```

The `.dockerignore` file prevents unnecessary or sensitive files such as `.env`, `node_modules`, and Git metadata from being copied into the image.

---

## ☁️ Deployment Architecture

```text
          GitHub
             │
             ▼
     Render Web Service
   Node.js + Express + EJS
             │
             ▼
        Aiven MySQL
     classicmodels Database
```

The application is automatically redeployed by Render after new commits are pushed to GitHub.

Production environment variables are configured directly in Render.

---

## 🎭 Application Flow

### Visitor

```text
/
↓
Welcome Page
↓
Login / Register
```

### Authenticated User

```text
Login
↓
Session Created
↓
/employees
↓
Employee Dashboard
```

### Logout

```text
Employee Dashboard
↓
Logout
↓
Welcome Page
```

---

## 📚 What I Learned

Through this project, I practiced:

- ⚙️ Building an Express web application
- 🧱 Structuring routes, controllers, models, middleware, and views
- 🗄️ Working with MySQL using `mysql2`
- 🔐 Building authentication workflows
- 🔑 Hashing passwords with bcrypt
- 🍪 Managing user sessions
- 🛡️ Implementing Role-Based Access Control
- 💉 Writing parameterized SQL queries
- 🔄 Using SQL transactions
- ✏️ Building CRUD functionality
- 🎨 Designing a responsive user interface
- ✨ Adding CSS and JavaScript animations
- 🔔 Building toast notifications
- ⚠️ Designing custom error pages
- 🐳 Building and running Docker images
- ☁️ Deploying Node.js applications to Render
- 🌐 Connecting to Aiven MySQL
- 🌿 Using Git and GitHub throughout development

---

## 🔮 Future Improvements

Possible future improvements include:

- 🗂️ Persistent production session storage
- ✅ Advanced server-side validation
- 🛡️ CSRF protection
- 🔒 Security headers
- 🚦 Rate limiting
- 📝 Audit logging
- 📊 Employee activity history
- 🔍 Advanced employee search
- 📊 Dashboard statistics
- 🧪 Automated testing
- 🐳 Docker Compose
- ⚙️ CI/CD workflow
- 🌙 Dark mode
- 🌐 Custom domain

---

## 👨‍💻 Developer

**Nguyen Hoang Viet**

Network Security student interested in:

- 🔐 Cybersecurity
- 🌐 Web Development
- 🌍 Networking
- 🐳 Docker
- 🛡️ Security Engineering

GitHub: [hoangviet47206](https://github.com/hoangviet47206)

---

## 📌 Project Status

```text
Authentication             ✅
Role-Based Authorization   ✅
Employee CRUD              ✅
Search & Filtering         ✅
Pagination                 ✅
Responsive UI              ✅
Animated Landing Page      ✅
Toast Notifications        ✅
Custom Error Pages         ✅
Docker                     ✅
Cloud Database             ✅
Public Deployment          ✅
```

**Status: Active / Portfolio Project**