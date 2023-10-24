a simple REST API with Node.js, Express, JWT and Postgres(TypeOrm) that lets the user register new user, login user and get user information from a protected route.
## Directory
```bash
src
 ┣ config
 ┃ ┣ default.ts
 ┃ ┗ test.ts
 ┣ controllers
 ┃ ┣ login.controller.ts
 ┃ ┣ me.controller.ts
 ┃ ┗ register.controller.ts
 ┣ entity
 ┃ ┣ client.entity.ts
 ┃ ┣ photo.entity.ts
 ┃ ┗ user.entity.ts
 ┣ middleware
 ┃ ┣ deserializeUser.ts
 ┃ ┣ passport-config.ts
 ┃ ┗ validateResource.ts
 ┣ routes
 ┃ ┣ login.routes.ts
 ┃ ┣ me.routes.ts
 ┃ ┗ register.routes.ts
 ┣ schemas
 ┃ ┣ login.schema.ts
 ┃ ┣ register.schema.ts
 ┃ ┗ spec.ts
 ┣ services
 ┃ ┣ interface
 ┃ ┃ ┗ user.interface.ts
 ┃ ┣ client.service.ts
 ┃ ┗ register.service.ts
 ┣ uploads
 ┃ ┣ image 1png
 ┃ ┗ janeimage.png
 ┣ utils
 ┃ ┣ connection.ts
 ┃ ┣ generateFullName.ts
 ┃ ┣ jwt.util.ts
 ┃ ┣ logger.ts
 ┃ ┣ server.ts
 ┃ ┗ uploadphoto.ts
 ┣ __tests__
 ┃ ┣ login.test.ts
 ┃ ┣ me.test.ts
 ┃ ┗ register.test.ts
 ┗ app.ts
```
## Routes
see documentation

## Documentation

[link](http://localhost:1487/api/docs) or here http://localhost:1487/api/docs

## Features
* REST API principals
    * CRUD
    * HTTP methods
* CRUD operations
* JWT authentication
* Request validation
* Error handling
* File uploads

## Installation
```bash
npm install
```
## Running the app
```bash
npm run run dev
```
## Tests
```bash
npm run test
```
you will need env file to run this app.
## Technologies
* Node.js
* PostgreSQL with TypeORM
* TypeScript
* Express.js & Express.js middleware
* Zod validation
* Passport.js
* JWT
* swagger-ui



## Data flow
![](./diagrams/data-flow.png)
