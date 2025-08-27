@echo off
REM Build the project
npm run build

REM Go to dist folder
cd dist

REM Initialize git and switch to gh-pages branch
git init
git checkout -b gh-pages

REM Add and commit files
git add .
git commit -m "Deploy to GitHub Pages"

REM Add remote and push to gh-pages branch
git remote add origin https://github.com/VISWAJIT-PS/Pradheesh-Akshara-wed.git
git push -f origin gh-pages

REM Clean up
cd ..
rmdir /s /q dist\.git
