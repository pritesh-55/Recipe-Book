# Recipe-Book

## 📌 Description
A full-stack recipe book web application built with **MongoDB**, **Express.js**, **React.js**, and **Node.js**. Users can register, log in, add their favorite recipes, search/filter existing recipes, and manage their own recipe collections — all in a clean and responsive UI.

---

## 🧪 Tech Stack

- **Frontend**: React.js, Axios, React Router DOM, Context API
- **Backend**: Node.js, Express.js, MongoDB, Mongoose, JWT
- **Database**: MongoDB Atlas (or local MongoDB)
- **Authentication**: JWT-based token auth
- **Pagination**: `mongoose-paginate-v2`

---

## 📁 Project Structure
```bash

├── backend/ # Node.js + Express backend
│ ├── controllers/
│ ├── middleware/
│ ├── models/
│ ├── routes/
│ ├── utils/
│ ├── .env
│ └── server.js
│
├── frontend/ # React frontend
│ ├── public/
│ ├── src/
│ │ ├── components/
│ │ ├── context/
│ │ ├── pages/
│ │ ├── App.js
│ │ └── index.js
│ ├── .env
│ └── package.json
│
├── .gitignore
├── README.md
└── package.json

```
---

## 🛠 Setup Instructions

1. **Clone the repository**
```bash
git clone https://github.com/pritesh-55/Recipe-Book.git
cd Recipe-Book

```
2. **Backend Setup (Node.js + MongoDB) Install dependencies**
```bash
cd backend
npm install

```
3. **Setup environment**
```bash
cp .env.example .env
```

4. **Run the project**
```bash
npm run start

```

5. ** Frontend Setup (React)**
```bash
cd ../frontend
npm install

```

6. **Run the project**
```bash
npm run start

```

---

## 🚀 Features Implemented

### ✅ **Authentication**
- User Registration with JWT token generation
- User Login with token persistence
- Protected routes for authenticated users only

### 📖 **Recipe Management**
- Create, View, Update, Delete (CRUD) recipes
- Only recipe owners can edit or delete their own recipes

### 🔍 **Search & Filter**
- Search recipes by title
- Filter by ingredients (supports multiple)
- Filter by cooking time

### 🗂️ **Pagination**
- Recipes list is paginated (Home and My Recipes pages)
- Users can navigate between pages using Next/Previous controls

### 👤 **User-specific Recipe Dashboard**
- "My Recipes" page showing only logged-in user's own recipes

### 📱 **Responsive UI**
- Fully responsive design built using plain CSS
- Works well on desktop, tablet, and mobile screens

---

