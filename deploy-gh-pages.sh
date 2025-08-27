@echo off
REM Deploy Vite build to gh-pages branch
set -e

REM Build the project
npm run build

REM No need to switch branches, just commit docs to main
REM Add and commit docs folder
git add docs
git commit -m "Update docs for GitHub Pages"
git push origin main
