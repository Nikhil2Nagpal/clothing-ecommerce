# Clothing E-commerce Application

A full-stack e-commerce application built with the MERN stack (MongoDB, Express.js, React, Node.js).

## Features

- User authentication (register/login/logout)
- Product browsing with search and advanced filters
- Shopping cart functionality (works for guests and logged-in users)
- Mock checkout process
- Order placement with confirmation email
- Responsive design

## Tech Stack

### Backend
- Node.js v18+
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- bcrypt for password hashing
- Nodemailer for email notifications

### Frontend
- React.js with Vite
- React Router v6
- Tailwind CSS for styling
- Context API for state management

## Project Structure

```
clothing-ecommerce/
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── seedProducts.js
│   ├── server.js
│   └── .env
└── frontend/
    ├── src/
    │   ├── components/
    │   ├── context/
    │   ├── pages/
    │   ├── services/
    │   ├── App.jsx
    │   └── main.jsx
    ├── public/
    ├── index.html
    ├── package.json
    └── vite.config.js
```

## Setup Instructions

### Prerequisites
- Node.js v18 or higher
- MongoDB database (local or cloud)
- Gmail account for email notifications (or Mailtrap/SendGrid for testing)

### Backend Setup

1. Navigate to the backend directory:
   ```
   cd backend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the backend directory with the following variables:
   ```
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_strong_secret_key
   NODE_ENV=development
   EMAIL_USER=yourgmail@gmail.com
   EMAIL_PASS=your_app_password
   ```

4. Seed the database with sample products:
   ```
   node seedProducts.js
   ```

5. Start the backend server:
   ```
   npm run dev
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```
   cd frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm run dev
   ```

4. Open your browser and visit `http://localhost:3000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user

### Products
- `GET /api/products` - Get all products with filtering and pagination
- `GET /api/products/:id` - Get a single product by ID

### Cart
- `GET /api/cart` - Get user's cart
- `POST /api/cart/add` - Add item to cart
- `PUT /api/cart/update` - Update cart item quantity
- `DELETE /api/cart/remove/:itemId` - Remove item from cart

### Orders
- `POST /api/orders` - Create a new order
- `GET /api/orders/:id` - Get order by ID
- `GET /api/orders/myorders` - Get logged-in user's orders

## Deployment

### Backend
1. Set environment variables on your hosting platform
2. Deploy the backend to platforms like Render, Heroku, or Railway

### Frontend
1. Build the production version:
   ```
   npm run build
   ```
2. Deploy the contents of the `dist` folder to platforms like Vercel, Netlify, or GitHub Pages

## Contributing

1. Fork the repository
2. Create a new branch for your feature
3. Commit your changes
4. Push to the branch
5. Create a pull request

## License

This project is licensed under the MIT License.