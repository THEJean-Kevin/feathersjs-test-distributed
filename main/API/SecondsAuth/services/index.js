const users = require("./users/users.service.js")
const todos = require('./seconds/seconds.service.js');
module.exports = function () {
	this.configure(users)

	this.configure(todos)

	let todoService = this.service('seconds')
  todoService.find({})
  .then(todos => {
    if (todos.length === 0) {

      todoService.create({
        title: 'TODO First Seconds',
        description: 'You have a todo Seconds!'
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
        email: 'userSeconds@test.com',
        password: 'password'
      }).then(result => {
        console.log('User created!', result);
      }).catch(error => {
        console.error('Error creating user!', error);
      });
    }
  });

};
