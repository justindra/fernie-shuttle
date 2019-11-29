#!/usr/bin/env sh

# abort on errors
set -e

# build
yarn build

# navigate into the build output directory
cd dist

# if you are deploying to a custom domain
# echo 'www.example.com' > CNAME

git init
git add -A
git commit -m 'deploy'

# Deploy to Github Pages branch
git push -f git@github.com:justindra/fernie-shuttle.git master:gh-pages

cd -