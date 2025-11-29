#!/bin/bash

echo "Starting Step 1 Platform..."
echo

echo "Installing dependencies..."
npm install

echo
echo "Starting backend server..."
npm run start:backend &
BACKEND_PID=$!

echo
echo "Waiting for backend to start..."
sleep 3

echo
echo "Starting frontend server..."
npm run start:frontend &
FRONTEND_PID=$!

echo
echo "Step 1 Platform is starting..."
echo "Frontend: http://localhost:3000"
echo "Backend API: http://localhost:3001/api"
echo "Admin Panel: http://localhost:3000/admin.html"
echo

# Function to cleanup on exit
cleanup() {
    echo "Stopping servers..."
    kill $BACKEND_PID 2>/dev/null
    kill $FRONTEND_PID 2>/dev/null
    exit
}

# Trap Ctrl+C
trap cleanup INT

# Wait for user to stop
echo "Press Ctrl+C to stop all servers"
wait
