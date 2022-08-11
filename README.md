# coder_management

CoderManagement is a platform that helps individuals and teams manage their tasks.Task management tools allow teams to collaborate digitally by organizing, prioritizing, and assigning tasks to each other

Change .env.example to .env

Replace your uri in app.js

`npm install` and `npm start` to start this app

## method GET

Get all user

- @route GET API/users
- @description Get a list of users
- @access private

## method GET

Get all task of user by user's id

- @route GET api/users/:id
- @description Get all task of user
- @access public

## method POST

Create a new user (assigner)

- @route POST api/users
- @description Create new user
- @access private, assigner

---

# As a manager's role

## method POST

- @route POST api/tasks
- @description Create new task
- @access private, assigner

## method GET

- @route GET api/tasks
- @description Get all task
- @access private, assigner

## method PUT

- @route PUT api/tasks/:id
- @description update status or assignee to assign or unassign task to employee
- @access private, assigner

## method GET

- @route GET api/tasks/:id
- @description get detail description of this task by task's id
- @access private, assigner

## method DELETE

- @route DELETE api/tasks/:id
- @description delete task when done
- @access private, assigner
