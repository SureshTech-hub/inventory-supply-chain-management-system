# Inventory & Supply Chain Management System

A full-stack Inventory & Supply Chain Management System built using ReactJS, Node.js, Express.js, and SQLite.

## Overview

This application helps organizations manage inventory operations, warehouse stock, supplier purchases, and product movement efficiently.

The system provides role-based access control for Admins, Managers, and Suppliers while maintaining inventory accuracy through stock movement tracking and warehouse-level monitoring.

## Tech Stack

### Frontend

* ReactJS
* React Router DOM
* Axios

### Backend

* Node.js
* Express.js
* JWT Authentication
* bcrypt.js

### Database

* SQLite

## Features

* User Authentication
* Role-Based Access Control
* Product Management
* Stock In / Stock Out Tracking
* Warehouse Management
* Purchase Order Management
* Low Stock Alerts
* Analytics Dashboard
* Mobile Responsive Design


## User Roles

### Admin

* Manage system users
* View inventory information
* Access analytics dashboard

### Warehouse Manager

* Create and manage products
* Update stock levels
* Create purchase orders
* Manage warehouses
* Monitor inventory movement

### Supplier

* View assigned purchase orders
* Access inventory information related to supplied products

---

## Core Modules

### Product Management

* Create products
* View product inventory
* Track product quantities
* Associate products with warehouses and suppliers

### Stock Management

* Stock In operations
* Stock Out operations
* Inventory movement tracking
* Prevent negative stock levels

### Warehouse Management

* Create warehouses
* Monitor warehouse inventory
* Warehouse-wise stock tracking

### Purchase Order Management

* Create purchase orders
* View purchase order history
* Track order status

### Analytics Dashboard

* Total Products
* Total Warehouses
* Total Purchase Orders
* Low Stock Alerts

## Database Design

### Users

| Column   | Type    | Description                |
| -------- | ------- | -------------------------- |
| id       | INTEGER | Primary Key                |
| name     | TEXT    | User Name                  |
| email    | TEXT    | Unique Email               |
| password | TEXT    | Encrypted Password         |
| role     | TEXT    | admin / manager / supplier |

### Products

| Column       | Type     | Description         |
| ------------ | -------- | ------------------- |
| id           | INTEGER  | Primary Key         |
| name         | TEXT     | Product Name        |
| sku          | TEXT     | Unique SKU          |
| quantity     | INTEGER  | Available Stock     |
| warehouse_id | INTEGER  | Warehouse Reference |
| supplier_id  | INTEGER  | Supplier Reference  |
| created_at   | DATETIME | Creation Timestamp  |

### Warehouses

| Column   | Type    | Description        |
| -------- | ------- | ------------------ |
| id       | INTEGER | Primary Key        |
| name     | TEXT    | Warehouse Name     |
| location | TEXT    | Warehouse Location |

### Stock Movements

| Column        | Type     | Description         |
| ------------- | -------- | ------------------- |
| id            | INTEGER  | Primary Key         |
| product_id    | INTEGER  | Product Reference   |
| movement_type | TEXT     | IN / OUT            |
| quantity      | INTEGER  | Movement Quantity   |
| warehouse_id  | INTEGER  | Warehouse Reference |
| created_by    | INTEGER  | User Reference      |
| created_at    | DATETIME | Timestamp           |

### Purchase Orders

| Column      | Type     | Description        |
| ----------- | -------- | ------------------ |
| id          | INTEGER  | Primary Key        |
| supplier_id | INTEGER  | Supplier Reference |
| product_id  | INTEGER  | Product Reference  |
| quantity    | INTEGER  | Ordered Quantity   |
| status      | TEXT     | Order Status       |
| created_at  | DATETIME | Timestamp          |


## API Endpoints

### Authentication

| Method | Endpoint | Description |
|

## Installation & Setup

### Clone Repository

```bash
git clone <your-github-repository-url>
```

### Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

Frontend runs on:

```text
http://localhost:5173
```

### Backend Setup

```bash
cd backend

npm install

npm start
```

Backend runs on:

```text
http://localhost:5000
```

### Database Setup

SQLite database is automatically created when the backend starts.

Database file:

```text
backend/database/inventory.db
```

## Environment Variables

Create a `.env` file inside the backend folder:

```env
PORT=5000

JWT_SECRET=your_secret_key
```

## Future Enhancements

- AI-based Demand Forecasting
- Barcode Scanning Integration
- Automated Reorder System
- Email Notifications
- Inventory Reports Export
- Multi-Warehouse Transfer Requests

## Screenshots

### Login Page

(Add Screenshot Here)

### Dashboard

(Add Screenshot Here)

### Products Management

(Add Screenshot Here)

### Stock Management

(Add Screenshot Here)

### Analytics Dashboard

(Add Screenshot Here)


## Author

**Nagireddy Suresh**

Full Stack Developer

Tech Stack:
- ReactJS
- Node.js
- Express.js
- SQLite
- JWT Authentication

GitHub: (https://github.com/SureshTech-hub)
LinkedIn: (https://www.linkedin.com/in/suresh318)