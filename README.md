# Feedback Collection Platform

A full-stack MERN application designed for businesses to create dynamic feedback forms and analyze customer responses through an intuitive dashboard.

### Live Demo
`https://feedback-collection-platform-iota.vercel.app`

---

## Features

This platform provides a seamless experience for both administrators and end-users with a rich set of features:

-   **Admin Authentication:** Secure registration and login for administrators using JWT (JSON Web Tokens).
-   **Dynamic Form Creation:** Admins can create custom forms with a title and multiple questions, supporting both plain text and multiple-choice answer types.
-   **Sharable Public Links:** Each form generates a unique, public URL that can be shared with customers for feedback submission.
-   **Intuitive Feedback Submission:** A clean, user-friendly interface for customers to fill out and submit forms without needing to log in.
-   **Data-Rich Dashboard:** A beautiful dashboard for admins to view key metrics at a glance, including total forms created and total responses received.
-   **Visual Analytics:** A responsive bar chart on the dashboard visualizes the number of responses for each form, making it easy to see which forms are most active.
-   **Comprehensive Response Viewing:** Admins can view all submitted responses for a specific form in a clear, tabular format.
-   **CSV Export (Bonus Feature):** Admins can export all responses for a form into a CSV file for offline analysis or use in other tools.
-   **Fully Mobile-Responsive (Bonus Feature):** The entire application, from the admin dashboard to the public forms, is designed to work beautifully on all devices.
-   **Graceful Notifications:** A non-intrusive notification system provides feedback for actions like copying a link, creating a form, or encountering an error.

---

## Tech Stack

This project leverages a modern MERN stack and other leading technologies to deliver a robust and scalable application.

-   **Frontend:**
    -   **React:** For building a fast, component-based user interface.
    -   **Tailwind CSS:** For a utility-first approach to styling, enabling rapid and consistent design.
    -   **Recharts:** For creating beautiful and interactive charts on the dashboard.
    -   **Axios:** For making HTTP requests from the client to the backend API.
    -   **React Router:** For client-side routing and navigation.

-   **Backend:**
    -   **Node.js:** As the JavaScript runtime environment.
    -   **Express.js:** As the web framework for building the RESTful API.
    -   **MongoDB:** As the NoSQL database for storing user, form, and response data.
    -   **Mongoose:** As the Object Data Modeling (ODM) library for MongoDB.
    -   **JWT (jsonwebtoken):** For implementing secure user authentication.
    -   **bcrypt.js:** For hashing user passwords before storing them in the database.
    -   **CORS:** For enabling secure cross-origin requests between the frontend and backend.
    -   **papaparse:** For converting JSON data to CSV format for the export feature.

-   **Deployment:**
    -   **Vercel:** For continuous deployment and hosting of the frontend React application.
    -   **Render:** For hosting the backend Node.js server and MongoDB database.

---

## Project Structure

The project is organized into a monorepo-like structure with separate `frontend` and `backend` directories to maintain a clean separation of concerns.

```
feedback-platform/
├── backend/
│   ├── package.json
│   ├── server.js
│   ├── .env
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   └── routes/
└── frontend/
    ├── package.json
    ├── tailwind.config.js
    ├── public/
    └── src/
        ├── api/
        ├── components/
        ├── context/
        ├── pages/
        ├── App.js
        └── index.css
```

---

## Local Development Setup

To run this project on your local machine, follow these steps.

### Prerequisites
* Node.js (v14 or later)
* npm
* MongoDB Atlas account (or a local MongoDB instance)

### 1. Clone the Repository
```bash
git clone https://github.com/adarsh-naik-2004/feedback-collection-platform.git
cd feedback-platform
```

### 2. Backend Setup
Navigate to the backend directory and install the required dependencies.

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory and add the following environment variables:

```
PORT=5000
MONGO_URI=YOUR_MONGODB_CONNECTION_STRING
JWT_SECRET=YOUR_SUPER_SECRET_KEY
CORS_ORIGIN=http://localhost:3000
```
* `MONGO_URI`: Your connection string from MongoDB Atlas.
* `JWT_SECRET`: A long, random string used to sign tokens.

### 3. Frontend Setup
In a new terminal, navigate to the frontend directory and install dependencies.

```bash
cd frontend
npm install
```

Create a `.env` file in the `frontend` directory and add the following:

```
REACT_APP_API_URL=http://localhost:5000/api
```

### 4. Run the Application
You need to run both the backend and frontend servers concurrently in two separate terminals.

**Terminal 1 (Backend):**
```bash
# From the backend directory
npm start
```
The backend server will be running on `http://localhost:5000`.

**Terminal 2 (Frontend):**
```bash
# From the frontend directory
npm start
```
The frontend application will open automatically in your browser at `http://localhost:3000`.

---

## Deployment

### Backend on Render
1.  Push your code to a GitHub repository.
2.  On the Render Dashboard, click "New +" and select "Web Service".
3.  Connect your GitHub repository.
4.  Set the following configuration:
    -   **Root Directory:** `backend`
    -   **Build Command:** `npm install`
    -   **Start Command:** `npm start`
5.  Under "Environment Variables", add the following:
    -   `PORT`: Port at which backend server will run.
    -   `MONGO_URI`: Your MongoDB Atlas connection string.
    -   `JWT_SECRET`: Your secret key for JWT.
    -   `CORS_ORIGIN`: Your deployed Vercel frontend URL (e.g., `https://your-app.vercel.app`).
6.  Click "Create Web Service".

### Frontend on Vercel
1.  Push your code to the same GitHub repository.
2.  On the Vercel Dashboard, click "Add New..." and select "Project".
3.  Connect your GitHub repository.
4.  Vercel will automatically detect that it's a Create React App project. Set the **Root Directory** to `frontend`.
5.  Under "Environment Variables", add the following:
    -   `REACT_APP_API_URL`: Your deployed Render backend URL (e.g., `https://your-backend.onrender.com/api`).
6.  Click "Deploy".

---

## Approach and Design Decisions

* **Modular Architecture:** The separation of the frontend and backend into distinct directories allows for independent development, scaling, and maintenance. The backend itself is further modularized using a `controllers`/`routes`/`models` pattern, which makes the API easy to understand and extend.
* **User Experience (UX):** The primary focus was on creating a clean, intuitive, and beautiful user interface. This was achieved by:
    -   Using a modern, dark-themed design with gradients and glassmorphism effects.
    -   Ensuring all pages are fully responsive and look great on any device.
    -   Implementing a non-blocking notification system instead of disruptive `alert()` boxes for a smoother user journey.
    -   Providing clear visual feedback for loading states and empty states (e.g., when a user has no forms).
* **State Management:** For the frontend, React's Context API was chosen for managing global state like user authentication and notifications. This is a lightweight and built-in solution that is perfect for the scale of this application, avoiding the need for larger libraries like Redux.
* **Styling with Tailwind CSS:** Tailwind CSS was selected to enable rapid UI development with a consistent design language. By using utility classes directly in the JSX, we avoid context-switching between different files and can build complex, responsive components quickly.
* **Security:**
    -   Passwords are never stored in plain text; they are hashed using `bcrypt` before being saved to the database.
    -   Protected admin routes are secured using JWTs, ensuring that only authenticated users can access sensitive data and functionality.
    -   The backend's CORS policy is configured to only accept requests from specific, whitelisted origins (the deployed frontend and localhost), preventing unauthorized websites from interacting with the API.
