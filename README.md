<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

# STORE-X project API

This project is the API of the STORE-X store, this repository is being used for educational purposes only and has no direct relationship with the application that is in production. Similarly, it should be clarified that STORE-X gave its approval to display this content without any problem for educational purposes

<p style="font-size:12px">Store-x is not a real name</p>

## How to run this project

1. Clone this repository.
2. Install al dependencies using `npm i`.
3. Create your .env file, it must have `POSTGRES_PASSWORD` and `POSTGRES_NAME=store-x-dev` (by default).
4. Set up your database PostgreSQL using Docker: `npm run docker:database`.
5. You can load mock data using seed request `http://localhost:3000/api/seed`
6. Enjoy coding.
