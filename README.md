﻿# BackendGreenCart API
# 🥬 BackendGreenCart - E-Commerce API

This is the **backend API** for a vegetable e-commerce platform built using **Node.js**, **Express**, **MongoDB**, and follows the **MVC architecture**.

## 🔑 Key Features

### 👤 User:
- Register/Login with **JWT + Cookies**
- View products, individual product details
- Add to Cart & Place Orders
- Add Shipping Address

### 🛒 Admin:
- Secure Login (by email check)
- **Add/Edit/Delete Products** with images (via **Multer + Cloudinary**)
- View placed orders
- Change product stock

## ⚙️ Tech Stack

- **Node.js + Express.js**
- **MongoDB + Mongoose**
- **JWT + Cookies**
- **Multer + Cloudinary**
- **MVC Pattern**

## 🔐 Authentication

- JWT-based login (for user & admin)
- Stored in **httpOnly cookies**
- Auth middlewares (`authUser`, `authSeller`)

## 🖼️ Image Uploads

- Handled using **Multer**
- Images hosted on **Cloudinary**

## 🧱 Project Structure
/server
├── controllers/
├── middleware/
├── models/
├── routes/
├── configs/
├── server.js

pgsql
Copy
Edit

## 🔗 Important APIs

| Method | Endpoint             | Access  | Description                  |
|--------|----------------------|---------|------------------------------|
| POST   | /user/register       | Public  | Register new user            |
| POST   | /user/login          | Public  | Login                        |
| GET    | /products/list       | Public  | All products                 |
| GET    | /products/:id        | Public  | Product by ID                |
| POST   | /product/add         | Admin   | Add product (Multer + Cloudinary) |
| POST   | /cart/add            | User    | Add to cart                  |
| POST   | /order/place         | User    | Place an order               |

