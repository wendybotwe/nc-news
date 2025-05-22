# Welcome to Wendy's NC News

Wendy's NC News is a hosted front and backend project created as part of the Northcoders Software Development Bootcamp. Users can view articles and the associated comments as well as being able to comment on those articles.

## Deployed version

https://wendy-nc-news.netlify.app/

## Set up info for the BackEnd

### Node

Install node.js

Minimum requirements: v23.9.0

(Check which version you currently have installed using `node -v`)

### Postgres

Minimum requirements: v8.13.3

(Check which version you currently have installed using `postgres -V`)

### GitHub

https://github.com/wendybotwe/seeding-nc-news

Clone this repo using

`git clone https://github.com/wendybotwe/seeding-nc-news`

### Install dependencies

`npm install`

### Create .env files

.env.test

`PGDATABASE=nc_news_test`

.env.development

`PGDATABASE=nc_news`

### Seed local database

To run the run-seed script (which calls the seed function with development data) use:

`npm run seed-dev`

### Run tests

`npm test`

This portfolio project was created as part of a Digital Skills Bootcamp in Software Engineering provided by [Northcoders](https://northcoders.com/)