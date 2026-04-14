# 🎓 CPMS — Campus Placement Management System

<p align="center">
  <img src="https://img.shields.io/badge/MERN-Stack-green?style=for-the-badge&logo=mongodb" />
  <img src="https://img.shields.io/badge/Frontend-React-blue?style=for-the-badge&logo=react" />
  <img src="https://img.shields.io/badge/Backend-Node.js-green?style=for-the-badge&logo=node.js" />
  <img src="https://img.shields.io/badge/Database-MongoDB-darkgreen?style=for-the-badge&logo=mongodb" />
  <img src="https://img.shields.io/badge/Auth-JWT-orange?style=for-the-badge" />
  <img src="https://img.shields.io/badge/License-MIT-purple?style=for-the-badge" />
</p>

---

## 📖 Overview

**CPMS (Campus Placement Management System)** is a full-stack MERN application that simplifies and automates the campus placement process for students and administrators.

It provides:

- 📊 Centralized job management
- 👨‍🎓 Student application tracking
- 🛠️ Admin control over placements
- 📈 Real-time statistics and dashboards

---

## 🚀 Live Demo

🔗 [cpms-app.vercel.app](https://cpms-app.vercel.app) *(Replace with your deployed link)*

---

## 📸 Screenshots

### 🏠 Home / Login Page
![Login Page](./screenshots/login.png)

### 📊 Admin Dashboard
![Admin Dashboard](./screenshots/admin-dashboard.png)

### 💼 Job Listings
![Jobs](./screenshots/jobs.png)

### 📄 Student Applications
![Applications](./screenshots/applications.png)

> 📌 Create a `screenshots/` folder in your repo and add the above images.

---

## ✨ Features

### 👨‍🎓 Student
- Register & Login (JWT-based authentication)
- Browse available jobs
- Apply to jobs
- Track application status:
  - 🟡 Registered
  - 🔵 In Progress
  - 🟢 Completed

### 🛠️ Admin
- Secure admin login
- Create / Update / Delete jobs
- Change job status
- Approve / Reject student applications
- View dashboard statistics

---

## 🏗️ Tech Stack

| Layer    | Technology              |
|----------|-------------------------|
| Frontend | React.js, Tailwind CSS  |
| Backend  | Node.js, Express.js     |
| Database | MongoDB (Mongoose)      |
| Auth     | JWT                     |
| Storage  | Cloudinary              |

---

## 📂 Folder Structure

```
CPMS/
│
├── server/src
│          ├── config/
│          ├── controllers/
│          ├── models/
│          ├── routes/
├── server/index.js
│
├── client/src/
│           ├── components/
│           ├── api/
│           └── App.jsx
│
└── screenshots/
```

---

## 🔄 Job Workflow

```
Registered → In Progress → Completed
```

- Status controlled by Admin
- Changes reflected in Student Dashboard in real-time

---

## 🔐 Authentication

- JWT-based authentication
- Token stored in `localStorage`
- Protected routes via Express middleware

---

## 🌐 API Endpoints

### Auth
```
POST /api/students/register
POST /api/students/login
POST /api/admin/login
```

### Jobs
```
GET    /api/jobs
POST   /api/jobs/create
PUT    /api/jobs/:id/status
```

### Applications
```
POST   /api/apply
GET    /api/applications
```

---

## ⚙️ Installation

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/your-username/cpms.git
cd cpms
```

### 2️⃣ Backend Setup
```bash
cd server
npm install
npm start
```

### 3️⃣ Frontend Setup
```bash
cd client
npm install
npm run dev
```

---

## 🔑 Environment Variables

Create a `.env` file in the `server/` directory:

```env
PORT=5000
MONGO_URI=your_mongo_uri
JWT_SECRET=your_secret
CLOUDINARY_CLOUD_NAME=your_name
CLOUDINARY_API_KEY=your_key
CLOUDINARY_API_SECRET=your_secret
```

---

## 📊 Dashboard Metrics

- Total Students
- Approved Students
- Total Jobs
- Applications Count

---

## 🚀 Future Improvements

- 📧 Email Notifications
- 📅 Interview Scheduling
- 🔔 Real-time Alerts (Socket.io)
- 🧠 Resume Parsing



---

## 📜 License

MIT License © 2026

---

## 👨‍💻 Author

**Prteek Gupta**

---

## ⭐ Support

If you like this project:

- 👉 Star ⭐ the repo
- 👉 Share it with others

---

