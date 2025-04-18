#!/bin/bash

# Create assets directory if it doesn't exist
mkdir -p public/assets

# Copy the original logo
cp Mockbuster_logo.png public/assets/

# Create favicon versions
convert Mockbuster_logo.png -resize 192x192 public/assets/Mockbuster_favicon_192.png
convert Mockbuster_logo.png -resize 512x512 public/assets/Mockbuster_favicon_512.png
convert Mockbuster_logo.png -resize 64x64 public/assets/Mockbuster_favicon_64.ico

echo "Logo files generated successfully!" 