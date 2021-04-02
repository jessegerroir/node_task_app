# Node Task Application

A simple RESTful API built using node.js and MongoDb. It includes proper authorization and uses javascript asynchronously. 

It has 10 endpoints:

- **Create New Account:** POST: /users/
- **Login Account:** POST: /users/login
- **View Account Information:** GET: /users/me
- **Update Account** Information: PATCH: /users/me
- **Logout Account:** POST: /users/logout
- **Delete Account:** DELETE: /users/me
- **Create Task: POST:** /tasks
- **View Assigned Tasks:** GET: /tasks
- **Update Task:** PATCH: /tasks/:id
- **Delete Task:** DELETE: /tasks/:id

Basically it lets you create a user, manage the user, and create tasks for them etc.

The front end is pretty simple and mainly used to document and demonstrate the endpoints.

![screenshot](https://i.imgur.com/T0oJKF5.png)


