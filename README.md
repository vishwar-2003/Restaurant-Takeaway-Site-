# Restaurant-Takeaway-Site

## Overview
Restaurant-Takeaway-Site is a full-stack web application designed for restaurant takeaway services. It includes a client-side application for customers and an admin dashboard for managing orders, menus,delivery slots and other restaurant-related data.

---

## Folder Structure

### Root Directory
- **.gitignore**: Specifies files and directories to be ignored by Git.
- **package.json**: Contains metadata about the project and its dependencies.
- **README.md**: Documentation for the project.

---

### Client
The client folder contains the front-end application built with React.

#### Structure:
- **.gitignore**: Specifies files and directories to be ignored by Git in the client folder.
- **package.json**: Contains metadata and dependencies for the client-side application.
- **public/**: Contains static assets.
  - **favicon.ico**: Favicon for the application.
  - **index.html**: Main HTML file for the React app.
  - **manifest.json**: Web app manifest file.
  - **robots.txt**: Instructions for web crawlers.
  - **assets/**: Additional static assets.
- **src/**: Contains the source code for the React application.
  - **App.jsx**: Main application component.
  - **App.css**: Styles for the application.
  - **index.js**: Entry point for the React application.
  - **components/**: Reusable UI components (e.g., Header, Footer, SignInForm).
  - **pages/**: Page components for different routes (e.g., Home, About, Menu, Admin).
  - **services/**: Contains service files for API calls.
  - **assets/**: Contains images, icons, and other static resources.

---

### Server
The server folder contains the back-end application built with Node.js and Express.

#### Structure:
- **.env**: Environment variables for the server.
- **index.js**: Entry point for the server.
- **server.js**: Main server configuration and route setup.
- **package.json**: Contains metadata and dependencies for the server-side application.
- **controllers/**: Contains controller files for handling business logic (e.g., AddressController, AdminController).
- **dbConn/**: Contains database connection logic.
- **middleware/**: Contains middleware functions for request handling.
- **models/**: Contains Mongoose models for database schemas.
- **routes/**: Contains route definitions for the API.
  - **authRoute.js**: Authentication routes.
  - **reviewRoute.js**: Review-related routes.
  - **menuRoute.js**: Menu-related routes.
  - **orderRoute.js**: Order-related routes.
  - **adminRoutes.js**: Admin authentication routes.
  - **admin/**: Admin-specific routes (e.g., deliveryWindowRoute).

---

## Features
- *Customer Features*:
  - Browse menu items.
  - Place orders(Takeway & Delivery).
  - View and manage orders.
  - Leave reviews.
- *Admin Features*:
  - Manage menu items(Edit,Add new items,Delete items).
  - View and manage orders(change the status of the Orders).
  - Manage delivery charges and windows(Adding delivery slots,editing and deleting slots).
  - View customer reviews.

---

## Installation

### Prerequisites
- Node.js
- MongoDB

### Steps
-*1. Clone the repository:*
   ```bash
   git clone <"https://github.com/vishwar-2003/Restaurant-Takeaway-Site-.git">

"2.Navigate to the client and server directories and install dependencies:"
cd client
npm install
cd ../server
npm install

"3.Set up environment variables in server/.env."

"4.Start the development servers"
cd client
npm start

*Server*
cd server
nodemon run server

*Usage*
Access the client application at http://localhost:3000.
Access the server API at http://localhost:5000.