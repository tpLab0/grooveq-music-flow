
#!/bin/bash

# This script helps set up the GrooveQ application locally

echo "Setting up GrooveQ locally..."

# Step 1: Create .env file from .env.example if it doesn't exist
if [ ! -f .env ]; then
  echo "Creating .env file from .env.example"
  cp .env.example .env
  echo ".env file created. Please update it with your database credentials if needed."
else
  echo ".env file already exists."
fi

# Step 2: Install dependencies
echo "Installing dependencies..."
npm install

# Step 3: Generate Prisma client
echo "Generating Prisma client..."
npx prisma generate

# Step 4: Apply migrations (with --create-only flag to avoid shadow DB)
echo "Creating migration..."
npx prisma migrate dev --name init --create-only

# Step 5: Apply migration directly
echo "Applying migration directly..."
npx prisma migrate deploy

# Step 6: Start development server
echo "Starting development server..."
echo "You can run 'npm run dev' to start the server manually."

echo "Setup complete! You can now start your development server with 'npm run dev'."
