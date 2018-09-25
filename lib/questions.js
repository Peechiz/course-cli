const inquirer = require('inquirer');

module.exports = {
  getName(){
    return inquirer.prompt([
      {
        name: 'name',
        message: 'What is your name?',
        validate(name){
          return (name.length) ? true : 'Please input a name'
        }
      }
    ])
  },
  getAction(){
    return inquirer.prompt([
      {
        type: 'list',
        name: 'action',
        message: 'Choose an action:',
        choices: [
          'Add',
          'Edit',
          'List',
          'Search',
        ]
      }
    ])
  },
  doMore(){
    return inquirer.prompt([
      {
        type: 'confirm',
        name: 'continue',
        message: 'Additional operations?'
      }
    ])
  },
  getFavorites(courses){
    return inquirer.prompt([
      {
        type: 'checkbox',
        name: 'favorites',
        message: 'Select courses to enroll',
        choices: courses.selectCourses()
      }
    ])
  }
}