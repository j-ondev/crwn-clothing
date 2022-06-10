# Crwn Clothing Ecommerce

This project was developed during the ["Complete React Developer in 2022" course by Zero To Mastery](https://zerotomastery.io/courses/learn-react/).
You will see a lot of discrepancy between my code and theirs because I created an entire backend from the absolute zero. If you want to learn how to create one by yourself, you can also check their NodeJS course.

## Quick Notes

This project isn't supposed to be launched into production, I have made it to show some of my skills as developer (mainly the frontend).
In the course you also learn about [Redux Sagas](https://redux-saga.js.org/), however, I decided to not use it since redux sagas would result in a lot of entropy and is not necessary on this project.


### What you will find in this project

#### Frontend

- TypeScript
- React Hooks
- Apollo Client
- Stripe Payment
- Styled Components
- Google SSO (single sign-on)
- Redux Toolkit (rarely necessary when you're using apollo client)

#### Backend

- JWT
- Express
- Node Postgres
- Google Authentication
- Apollo Server/GraphQL Tools

### What is missing from this project

- Docker file
- Github actions
- Some test files
- Bcrypt password hash - **extremely important if you want to use this project into production**
- Documentation/description about functions, classes and methods (but there are a few comments)

## Get Started

In order to run this project into your machine, you'll have to follow all the steps in this section. Please, make sure you're not forgetting anything because each step is crucial to make the application work properly.

### Installing dependencies

If you are planning to run this project into your machine, you'll have to follow these steps:

1. Install all dependencies from server and client running `yarn install` command.
2. Create a new postgre database (you can run or check the  database structure within the crwn-db.sql file).
3. In case you want to query something with GraphiQL: make sure to give your user the right permissions in the permissions column inside user table and inform your credentials inside the header.

### Configuring server and variables

Create a `.env` file inside your server folder containing the following variables:

```shell
# Application variables
PORT=4000 # Or any port of your choice, CRA uses port 3000
NODE_ENV='development'

# Postgre Database
PGHOST=''
PGUSER=''
PGDATABASE=''
PGPASSWORD=''
PGPORT=5432

# JWT
JWT_SECRET_DEV='secret'
JWT_SECRET_PROD='YOUR JWT SECRET'

# Google Strategy
GCLIENT_ID_WEB='YOUR GOOGLE API ID KEY'

# Stripe
STRIPE_SECRET_KEY='YOUR STRIPE SECRET KEY'
```

Grab your `.pem` certificate file and put inside of `server/certs` or, you can generate one if you have openssl installed (linux and macos already comes with it) with the following command: `openssl req -x509 -newkey rsa:4096 -nodes-keyout key.pem -out cert.pem -days 365`. This will create a certificate valid for one year, **DON'T FORGET TO TRUST THE CERTIFICATE INSIDE YOUR BROWSER ELSE THE FRONTEND WON'T WORK**

### Configuring your react variables

To make the ecommerce work properly, you have to set a `.env` or `.env.development.local` file with following variables:

```shell
# Google
REACT_APP_GOOGLE_CLIENT_ID='YOUR GOOGLE API ID KEY'

# API_URL
REACT_APP_API_URL='YOUR_BACKEND_URL:PORT'

# Stripe
REACT_APP_STRIPE_PUBLISHABLE_KEY='YOUR STRIPE PUBLISHABLE KEY'
```

## Disclaimer

You are allowed to fork, clone and use this project at free will. If you want to make changes to the project, i recommend to create a new branc, test your code and make a PR to the main branch.
**Thank you and blessings to your code!**
