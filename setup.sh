
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

# Step 4: Create migration and apply it (with --create-only to avoid shadow db)
echo "Creating migration..."
npx prisma migrate dev --name init --create-only

# Step 5: Apply the migration directly (without shadow database)
echo "Applying migration..."
npx prisma migrate deploy

# Step 6: Install prisma client using npm
echo "Installing Prisma client..."
npm install --save @prisma/client

# Step 7: Start development server
echo "Setup complete! You can now start your development server with 'npm run dev'."

