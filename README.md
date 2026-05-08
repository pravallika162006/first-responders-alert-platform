# 🚑 First Responders Alert Platform

A full-stack emergency response web application that allows users to send real-time emergency alerts and request immediate assistance during critical situations.

---

## 📌 Project Overview

The First Responders Alert Platform is designed to help users quickly notify emergency responders during emergencies. Users can securely register, log in, and submit emergency requests through an interactive dashboard.

The platform aims to improve emergency communication and response coordination using modern web technologies.

---

## ✨ Features

### 👤 Authentication
- User Signup and Login
- Secure JWT Authentication
- Protected Routes

### 🚨 Emergency Alert System
- Send emergency requests
- Select emergency type
- Real-time request handling

### 📊 Dashboard
- View submitted requests
- Track emergency details
- User-friendly interface

### 🔒 Security
- Environment variable protection
- Secure backend APIs
- Authentication middleware

---

## 🛠️ Tech Stack

### Frontend
- React.js
- Vite
- CSS

### Backend
- Node.js
- Express.js

### Database
- MongoDB Atlas
- Mongoose

### Authentication
- JWT (JSON Web Token)

---

## 📂 Project Structure

```bash
FIRST-RESPONDERS-ALERT-PLATFORM
│
├── client
│   ├── src
│   ├── public
│   └── components
│
├── server
│   ├── controllers
│   ├── routes
│   ├── models
│   └── middleware

## ⚙️ Installation & Setup

### 1️⃣ Clone Repository

```bash
git clone https://github.com/your-username/first-responders-alert-platform.git
```

### 2️⃣ Install Frontend Dependencies

```bash
cd client
npm install
```

### 3️⃣ Install Backend Dependencies

```bash
cd server
npm install
```

### 4️⃣ Configure Environment Variables

Create a `.env` file inside the `server` folder and add:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

### 5️⃣ Run Frontend

```bash
npm run dev
```

### 6️⃣ Run Backend

```bash
node server.js
```
