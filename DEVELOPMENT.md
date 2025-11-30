# Development Setup Guide

## Prerequisites

1. Node.js v18 or higher
2. MongoDB database (local or cloud)
3. Code editor (VS Code recommended)

## Initial Setup

1. Clone the repository (if using git)
2. Navigate to the project root directory

## Backend Setup

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
   npm run seed
   ```

## Frontend Setup

1. Navigate to the frontend directory:
   ```
   cd frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

## Running the Application

### Development Mode

To run both frontend and backend simultaneously:
```
npm run dev
```

This will start:
- Backend server on `http://localhost:5000`
- Frontend development server on `http://localhost:3000`

### Running Backend Only

```
cd backend
npm run dev
```

### Running Frontend Only

```
cd frontend
npm run dev
```

## Project Structure

```
clothing-ecommerce/
├── backend/
│   ├── config/          # Database configuration
│   ├── controllers/     # Request handlers
│   ├── middleware/      # Custom middleware
│   ├── models/          # Database models
│   ├── routes/          # API routes
│   ├── utils/           # Utility functions
│   ├── seedProducts.js  # Product seeding script
│   ├── server.js        # Entry point
│   └── .env             # Environment variables
└── frontend/
    ├── src/
    │   ├── components/  # Reusable UI components
    │   ├── context/     # React context providers
    │   ├── pages/       # Page components
    │   ├── services/    # API service functions
    │   ├── App.jsx      # Main App component
    │   └── main.jsx     # Entry point
    ├── public/          # Static assets
    ├── index.html       # HTML template
    └── vite.config.js   # Vite configuration
```

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

## Development Workflow

1. Make changes to the code
2. The development servers will automatically reload
3. View changes in the browser

## Testing

For manual testing:
1. Register a new user
2. Browse products
3. Add items to cart
4. Proceed to checkout
5. Place an order

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

## Troubleshooting

### Common Issues

1. **Port already in use**: Change the PORT in `.env` file
2. **MongoDB connection error**: Check your MONGO_URI in `.env` file
3. **Dependency issues**: Delete `node_modules` folders and run `npm install` again

### Getting Help

If you encounter any issues:
1. Check the console for error messages
2. Verify all environment variables are set correctly
3. Ensure MongoDB is running and accessible