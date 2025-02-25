✅ To-Do Application (React + Redux Toolkit + RTK Query + Node.js)

A full-stack To-Do application built using:

Frontend: React, Redux Toolkit, RTK Query, TailwindCSS, React Hook Form, Zod

Backend: Node.js, Express, MySQL, Prisma ORM, JWT Authentication

🚀 Features

🔑 User Authentication (Signup, Login, Logout)

🔐 JWT-based Authentication & Role-Based Access Control

✅ Create, Update, Delete, Mark as Completed for Todos

🔍 Advanced Filtering (Search, Sorting, Pagination, Date Range)

👤 Profile Management & Change Password Functionality

📂 Project Structure

/todo_application
 ├── /node_modules          # Dependencies installed via npm
 ├── /public                # Public assets (index.html, favicon, etc.)
 ├── /src                   # Source code
 │   ├── /assets            # Images, logos, fonts
 │   ├── /components        # Reusable UI components (buttons, forms, modals)
 │   ├── /helpers           # Utility functions, constants
 │   ├── /layouts           # Layout components (Navbar, Sidebar, Footer)
 │   ├── /lib               # Library-specific helpers (if any)
 │   ├── /pages             # Pages (Dashboard, Profile, Login, etc.)
 │   ├── /routes            # React Router configurations
 │   ├── /stores            # Redux store, slices, API integrations
 │   ├── App.jsx            # Root component
 │   ├── AppNavigation.jsx  # Application routing logic
 │   ├── index.css          # Global styles
 │   ├── main.jsx           # Main entry point
 ├── .eslintrc.cjs          # ESLint configuration
 ├── .gitignore             # Ignored files for Git
 ├── components.json        # Component configuration (if any)
 ├── index.html             # Root HTML file
 ├── jsconfig.json          # JS/TS config for VSCode
 ├── package-lock.json      # Auto-generated npm dependency lock file
 ├── package.json           # Project metadata and dependencies
 ├── postcss.config.js      # PostCSS configuration for TailwindCSS
 ├── README.md              # Project documentation
 ├── tailwind.config.js     # TailwindCSS configuration
 ├── vite.config.js         # Vite project configuration

🛠️ How to Run This Project

1️⃣ Clone the Repository

git clone https://github.com/your-username/todo_application.git
cd todo_application

2️⃣ Install Dependencies

npm install

3️⃣ Setup Environment Variables

Create a .env file in the root directory and add the following:

VITE_API_BASE_URL=http://localhost:5000/api
DATABASE_URL="mysql://root:password@localhost:3306/dbname?schema=public"
JWT_SECRET=your-secret-key

Modify the values based on your local setup.

4️⃣ Start the Backend Server

Ensure you have Node.js installed, then run:

npm run build 
npm run start

The backend will be available at http://localhost:5500

5️⃣ Start the Frontend

In another terminal, run:

npm run build
npm run preview

Your frontend will be available at http://localhost:5173

🏗️ API Endpoints

🔐 Authentication

Method

Endpoint

Description

POST

/signup

User Signup

POST

/login

User Login

PUT

/change-password

Change Password

📝 Todos

Method

Endpoint

Description

GET

/todo

Get all todos

POST

/todo

Create a new todo

PATCH

/todo/:id

Update a todo status

PUT

/todo/:id

Edit a todo

DELETE

/todo/:id

Delete a todo

📌 Tech Stack

Frontend: React, Redux Toolkit, RTK Query, React Hook Form, TailwindCSS

Backend: Node.js, Express.js, Prisma ORM

Database: MySQL

Authentication: JWT (JSON Web Tokens)

Validation: Zod

🤝 Contributing

Feel free to submit a pull request if you find any improvements or bugs.

📜 License

This project is licensed under the MIT License.

