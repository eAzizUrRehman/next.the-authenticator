#!/bin/bash
set -e

echo "Deployment started..."

echo "Copying new changes to server!"
git pull origin main

echo "Installing Dependencies..."
npm install --yes --force

echo "Creating Production Build..."
npm run build

pm2 reload tasheerdigitalproject.azizurrehman.com
echo "PM2 Reload"

echo "Deployment Finished!"
