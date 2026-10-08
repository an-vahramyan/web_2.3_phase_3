# Online Course Platform

REST API for an online course platform built with Node.js, Express, Sequelize and PostgreSQL.
Instructors create courses and lessons, students enroll and track their progress, and an admin manages the platform.

## Install

1. Install Node.js and PostgreSQL.
2. Clone the repository.
3. Run `npm install`.
4. Copy `.env.example` to `.env` and set DB/JWT values.
5. Run `npm run seed`.
6. Run `npm run dev`.

The server creates the database if it does not exist, checks the connection, syncs the models and only then starts listening. If any step fails, it logs the error and exits.

## Seed accounts

- admin@example.com / Password123!
- instructor@example.com / Password123!
- student@example.com / Password123!

## Architecture

Request flow: Route -> Middleware -> Controller -> Service -> Model -> Database.

Routes define URLs and middleware only. Controllers adapt HTTP input/output. Services contain business rules and Sequelize
queries. Models define tables, validations and associations. Errors are normalized by the global error handler.

## Main endpoints

- POST /api/auth/register
- POST /api/auth/login
- GET /api/auth/me
- GET /api/users
- GET /api/users/:id
- PATCH /api/users/:id/role
- DELETE /api/users/:id
- GET /api/courses
- GET /api/courses/my
- GET /api/courses/:id
- POST /api/courses
- PUT /api/courses/:id
- DELETE /api/courses/:id
- GET /api/courses/:id/students
- GET /api/courses/:courseId/lessons
- GET /api/lessons/:id
- POST /api/courses/:courseId/lessons
- PUT /api/lessons/:id
- DELETE /api/lessons/:id
- POST /api/enrollments
- GET /api/enrollments/me
- PATCH /api/enrollments/:id/progress
- DELETE /api/enrollments/:id
- GET /api/enrollments

## Postman

Import `Online_Course_Platform.postman_collection.json` and run the collection on a fresh database after `npm run seed`.
It contains every endpoint plus error cases (wrong password, 401, 403, duplicate enrollment, duplicate lesson order) with automatic checks.

## Why is sync({ force: true }) dangerous?

`force: true` drops every table and creates it again on each start, so all stored data is lost.
This project uses `alter: true` only for development; production should use migrations instead.
