#!/bin/sh
# Deploy Vite build to gh-pages branch
set -e

npm run build
cd dist
git init
git checkout -b gh-pages
git add .
git commit -m "Deploy to GitHub Pages"
git remote add origin https://github.com/VISWAJIT-PS/Pradheesh-Akshara-wed.git
git push -f origin gh-pages
cd ..
rm -rf dist/.git
