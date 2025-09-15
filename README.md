# MiniJournal 📔

A sleek, full-stack personal journaling application built with the MERN stack (MongoDB, Express, React, Node.js) and styled with Tailwind CSS. This application provides a secure, private space for users to create, view, edit, and delete their daily entries.

## Final Preview

![MiniJournal Screenshot](./path/to/your/screenshot.png)
*(Replace this with a screenshot of your finished application)*

---

## Features

* **Secure User Authentication**: Users can register and log in to a private account. Session management is handled with JSON Web Tokens (JWT).
* **Full CRUD Functionality**: Create, read, update, and delete journal entries.
* **Modern Dark Theme UI**: A stunning, responsive dark theme built with Tailwind CSS.
* **Custom Date Picker**: A fully custom and theme-consistent date picker built with `shadcn/ui`.
* **Polished User Experience**: Includes toast notifications for user actions and a clean, intuitive layout.

---

## Tech Stack

### Backend
* **Node.js**: JavaScript runtime environment.
* **Express**: Web framework for Node.js.
* **MongoDB**: NoSQL database for storing user and entry data.
* **Mongoose**: Object Data Modeling (ODM) library for MongoDB.
* **JSON Web Token (JWT)**: For user authentication.
* **bcryptjs**: For password hashing.
* **CORS**: For enabling cross-origin requests.
* **dotenv**: For managing environment variables.

### Frontend
* **React**: JavaScript library for building user interfaces.
* **Vite**: Next-generation frontend tooling for a fast development experience.
* **Tailwind CSS**: A utility-first CSS framework for rapid UI development.
* **shadcn/ui**: Re-usable components built using Radix UI and Tailwind CSS.
* **Axios**: Promise-based HTTP client for making API requests.
* **React Router**: For client-side routing.
* **React Hot Toast**: For user-friendly notifications.

---

## Getting Started

### Prerequisites

* Node.js (v18.x or higher)
* npm
* MongoDB (local installation or a cloud service like MongoDB Atlas)

### Local Setup

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/YourUsername/minijournal.git](https://github.com/YourUsername/minijournal.git)
    cd minijournal
    ```

2.  **Setup the Backend:**
    ```bash
    # Navigate to the server directory
    cd server

    # Install dependencies
    npm install

    # Create a .env file in the /server directory
    # and add your variables
    touch .env
    ```
    Your `server/.env` file should look like this:
    ```
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_super_secret_jwt_key
    ```
    
3.  **Setup the Frontend:**
    ```bash
    # Navigate to the client directory from the root
    cd client

    # Install dependencies
    npm install
    ```

4.  **Run the Application:**
    * You can run each part separately from their respective directories (`/client` and `/server`) with `npm run dev` (for client) and `npm start` (for server).
    * Or, from the **root `minijournal` directory**, install `concurrently` to run both with one command:
        ```bash
        npm install concurrently
        # Then add this script to the root package.json:
        # "scripts": {
        #   "dev": "concurrently \"npm run dev --prefix client\" \"npm start --prefix server\""
        # }
        npm run dev
        ```

---

## API Endpoints

### Auth Routes
* `POST /api/auth/register`: Register a new user.
* `POST /api/auth/login`: Log in an existing user and receive a JWT.

### Entry Routes (Protected)
* `GET /api/entries`: Get all entries for the logged-in user.
* `POST /api/entries`: Create a new entry.
* `PATCH /api/entries/:id`: Update an existing entry.
* `DELETE /api/entries/:id`: Delete an entry.

---

