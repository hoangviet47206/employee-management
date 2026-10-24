# 👨‍💼 Employee Management System

A full-stack Employee Management web application built with **Node.js, Express, EJS, and MySQL**.

The project provides employee management features with **authentication, role-based authorization, filtering, pagination, and CRUD operations**.

## 🌐 Live Demo

https://employee-management-od9a.onrender.com

> ⚠️ The application is hosted on Render Free, so the first request after a period of inactivity may take some time to load.

---

## ✨ Features

### 🔐 Authentication

- ✅ User registration
- ✅ User login
- ✅ User logout
- ✅ Session-based authentication
- ✅ Password hashing with bcrypt

### 🛡️ Role-Based Authorization

The application supports three user roles:

| Feature | 👤 Employee | 🧑‍💼 Manager | 👑 Admin |
|---|---:|---:|---:|
| View employees | ✅ | ✅ | ✅ |
| Search / Filter | ✅ | ✅ | ✅ |
| Add employee | ❌ | ✅ | ✅ |
| Update employee | ❌ | ✅ | ✅ |
| Delete employee | ❌ | ❌ | ✅ |

Authorization is enforced on both the frontend and backend.

### 📋 Employee Management

- 👀 Display employee list
- 🔎 Search and filter employees
- 📄 Pagination
- ➕ Add new employees
- ✏️ Update employee information
- 🗑️ Delete employees
- 🔄 Handle related database records safely when deleting employees

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

### ☁️ Deployment

- **Application:** Render
- **Database:** Aiven MySQL
- **Source Control:** GitHub

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
│   └── styles/
│       ├── auth.css
│       └── employee-page.css
│
├── routes/
│   ├── authRouter.js
│   └── employeeRouter.js
│
├── views/
│   ├── employee-page.ejs
│   ├── login.ejs
│   └── register.ejs
│
├── app.js
├── package.json
├── .env.example
└── README.md
```

---

## 🗃️ Database

The project uses the MySQL `classicmodels` database with an additional `users` table for authentication and authorization.

Main tables used by the application include:

```text
employees
customers
offices
users
```

The `users` table stores:

- 👤 username
- 📧 email
- 🔒 hashed password
- 🛡️ user role
- 🔗 linked employee ID

Available roles:

```text
employee
manager
admin
```

---

## 🚀 Installation

### 1️⃣ Clone the repository

```bash
git clone https://github.com/hoangviet47206/employee-management.git
```

```bash
cd employee-management
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Configure environment variables

Create a `.env` file in the root directory:

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

> 🔐 Do not commit the `.env` file to GitHub.

---

## ▶️ Run the Application

```bash
npm start
```

The application will run at:

```text
http://localhost:8000
```

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

Production environment variables are configured directly on Render.

The deployed application connects securely to the Aiven MySQL database using SSL.

---

## 🔒 Security

The project currently implements several basic security mechanisms:

- 🔑 Password hashing using bcrypt
- 🍪 Session-based authentication
- 🚧 Protected routes
- 🛡️ Role-based authorization middleware
- 💉 Parameterized SQL queries
- 🔐 Environment variables for credentials and secrets
- 🔒 SSL connection to the production database

Users cannot gain additional privileges simply by hiding or modifying frontend elements because authorization is also checked on the backend.

---

## 📚 What I Learned

Through this project, I practiced:

- ⚙️ Building a Node.js and Express web application
- 🗄️ Working with MySQL using `mysql2`
- 🔐 Designing authentication workflows
- 🍪 Implementing session management
- 🛡️ Implementing Role-Based Access Control
- 🧩 Writing Express middleware
- ✏️ Performing CRUD operations
- 🔄 Using SQL transactions
- 🏗️ Separating routes, controllers, models, and views
- 🔧 Managing environment variables
- ☁️ Deploying a Node.js application
- 🌐 Connecting a cloud-hosted application to a remote MySQL database
- 🌿 Using Git and GitHub during development

---

## 🔮 Future Improvements

Possible improvements include:

- 🗂️ Persistent session storage
- ✅ Form validation
- ⚠️ Improved error handling
- 🛡️ CSRF protection
- 🔒 Security headers
- 🚦 Rate limiting
- 📝 Audit logs
- 📊 Employee activity history
- 📱 Improved responsive UI
- 🧪 Automated testing
- 🌐 Custom domain

---

## 👨‍💻 Author

**Nguyen Hoang Viet**

GitHub: [hoangviet47206](https://github.com/hoangviet47206)