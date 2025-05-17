
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

# Step 4: Check if database is already populated
echo "Checking database status..."
if npx prisma db pull --print >/dev/null 2>&1; then
  # Database exists and has schema, let's do a baseline migration
  echo "Database already has tables. Creating a baseline migration..."
  npx prisma migrate dev --name init --create-only
  echo "Applying migration with --skip-generate flag..."
  npx prisma migrate deploy --skip-generate
else
  # Database is empty or doesn't exist
  echo "Creating migration..."
  npx prisma migrate dev --name init --create-only
  echo "Applying migration directly..."
  npx prisma migrate deploy
fi

# Step 5: Install prisma client using npm instead of bun
echo "Installing Prisma client..."
npm install --save @prisma/client

# Step 6: Start development server
echo "Starting development server..."
echo "You can run 'npm run dev' to start the server manually."

echo "Setup complete! You can now start your development server with 'npm run dev'."
