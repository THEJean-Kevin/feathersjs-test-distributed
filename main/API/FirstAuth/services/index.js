const users = require("./users/users.service.js")
const todos = require('./first/first.service.js');
module.exports = function () {
	this.configure(users)

	this.configure(todos)

	let todoService = this.service('first')
  todoService.find({})
  .then(todos => {
    if (todos.length === 0) {

      todoService.create({
        title: 'TODO First',
        description: 'You have a todo First!'
      }).then(result => {
        console.log('Todo created!', result);
      }).catch(error => {
        console.error('Error creating todo!', error);
      });
    }
  });


  let userService = this.service('users');
  userService.find({})
  .then(users => {
    if (users.length === 0) {
      userService.create({
        email: 'user@test.com',
        password: 'password'
      }).then(result => {
        console.log('User created!', result);
      }).catch(error => {
        console.error('Error creating user!', error);
      });
    }
  });

};
