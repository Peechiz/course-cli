const inquirer = require('inquirer');

module.exports = {
  Add(courses){
    return new Promise((resolve, reject)=>{
      this.addCourse(courses)
        .then(answers => {
          courses.add(answers);
          resolve();
        })
    })
  },
  Edit(courses){
    let id;
    return new Promise((resolve, reject) => {
      this.selectEditCourse(courses)
        .then(({ id }) => {
          return this.editCourse(id, courses)
        })
        .then(course =>{
          courses.update(id, course)
          resolve();
        })
    })
  },
  List(courses){
    courses.list();
  },
  Search(courses){
    return new Promise((resolve, reject) => {
      this.getSearchTerm()
        .then(({ term }) => {
          courses.search(term);
          resolve()
        })
    })
  },
  addCourse(courses){
    return inquirer.prompt([
      {
        name: 'id',
        message: 'Course ID:',
        filter(id) {
          return parseInt(id)
        },
        validate(id) {
          if (courses.id(id)) return 'That id is already in use';
          return (parseInt(id) && String(id).length === 5 ) ? true : 'Please input a 5 digit number.';
        },
      },
      {
        name: 'name',
        message: 'Course Name:',
        validate(name) {
          return /^[\w\-_\s]+$/.test(name) ? true : 'Name must not contain special characters'
        },
      },
      {
        name: 'credits',
        message: '# Credits:',
        filter(credits) {
          return parseInt(credits)
        },
        validate(credits) {
          return (Number.isInteger(credits) && credits <= 10 && credits > 0) ? true : 'Please input an integer between 1 and 10'
        },
      },
      {
        name: 'subject',
        message: 'Subject:',
        validate(subject) {
          return /^[a-zA-Z\-_\s]+$/.test(subject) ? true : 'Subject must not contain special characters or numbers'
        },
      }
    ])
  },
  selectEditCourse(courses){
    return inquirer.prompt([
      {
        type: 'list',
        name: 'id',
        message: 'Select course to edit',
        choices: courses.selectCourses()
      }
    ])
  },
  editCourse(id, courses){
    let course = courses.id(id)
    return inquirer.prompt([
      {
        name: 'id',
        message: `Current ID: ${course.id}\n` + 
                 `New Course ID?`,
        filter(id) {
          return parseInt(id)
        },
        validate(id){
          if (courses.id(id)) return 'That id is already in use';
          return (parseInt(id) && String(id).length === 5) ? true : 'Please input a 5 digit number.'
        },
        default: course.id
      },
      {
        name: 'name',
        message: `Current Name: ${course.name}\n` + 
                 `New Course Name?`,
        validate(name){
          return /^[\w\-_\s]+$/.test(name) ? true : 'Name must not contain special characters'
        },
        default: course.name
      },
      {
        name: 'credits',
        message: `Current Credits: ${course.credits}\n` + 
                 `New Credits?`,
        filter(credits) {
          return parseInt(credits)
        },
        validate(credits){
          return (Number.isInteger(credits) && credits <=10 && credits > 0) ? true : 'Please input an integer between 1 and 10'
        },
        default: course.credits
      },
      {
        name: 'subject',
        message: `Current Subject: ${course.subject}\n` +
                 `New Subject?`,
        validate(subject) {
          return /^[a-zA-Z\-_\s]+$/.test(subject) ? true : 'Subject must not contain special characters or numbers'
        },
        default: course.subject
      }
    ])
  },
  getSearchTerm(){
    return inquirer.prompt([
      {
        name: 'term',
        message: 'Search Courses (any field, case sensitive):'
      }
    ])
  },
}