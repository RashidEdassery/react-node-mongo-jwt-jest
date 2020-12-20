Install the dependencies:

```bash
yarn install
```

Set the environment variables:

```bash
cp .env.example .env

# open .env and modify the environment variables (if needed)
```

### Commands

Running locally:

```bash
yarn run dev
```

Running in production:

```bash
yarn run start
```

Testing:

```bash
# run all tests
yarn run test

# run all tests in watch mode
yarn run test:watch

# run test coverage
yarn run coverage
```
Linting:

```bash
# run ESLint
yarn run lint

# fix ESLint errors
yarn run lint:fix

# run prettier
yarn run prettier

# fix prettier errors
yarn run prettier:fix
```

## Project Structure

```
src\
 |--config\         # Environment variables and configuration related things
 |--controllers\    # Route controllers (controller layer)
 |--docs\           # Swagger files
 |--middlewares\    # Custom express middlewares
 |--models\         # Mongoose models (data layer)
 |--routes\         # Routes
 |--services\       # Business logic (service layer)
 |--utils\          # Utility classes and functions
 |--validations\    # Request data validation schemas
 |--app.js          # Express app
 |--index.js        # App entry point
```

### API Endpoints

List of available routes:

**Routes**:\
`POST /v1/users/create` - create an User\
`POST /v1/users/update_password` - update user password\
`POST /v1/users/authenticate` - authentication/login route\
`GET /v1/colleges/:id` - get user by id\

**Documentation Route**:\
`GET /v1/docs` - API listings/docs with swagger.

