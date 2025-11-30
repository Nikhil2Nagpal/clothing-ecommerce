@echo off
echo Installing backend dependencies...
cd backend
npm install
echo.
echo Installing frontend dependencies...
cd ../frontend
npm install
echo.
echo Installing root dependencies...
cd ..
npm install
echo.
echo Setup complete!
echo.
echo To start the development server, run:
echo npm run dev