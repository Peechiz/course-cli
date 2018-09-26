const Table = require('cli-table3');
const chalk = require('chalk');

class Courses {

  /*
      Course:
        {
          id
          name
          credits
          subject
        }
  */

  constructor(){
    this.courses = [];
    this.user = '';
  }

  add(course){
    this.courses.push({
      favorite: false,
      ...course
    })
  }

  get enrolled(){
    return this.courses.filter(c => c.favorite)
  }

  get numEnrolled(){
    return this.enrolled.length;
  }

  get creditsEnrolled(){
    return this.enrolled.reduce((sum, c) => sum + c.credits, 0)
  }

  id(id){
    return this.courses.find(c => c.id === id)
  }

  selectCourses(){
    return this.courses.map(c => ({
      name: `${c.id} ${c.name}`,
      value: c.id,
      short: c.id
    }))
  }

  // arr <id> [11111, 22222, 12345]
  setFavorites(arr){
    this.courses.forEach(c => {
      if (arr.includes(c.id)){
        c.favorite = true;
      }
    })
  }

  update(id, course){
    let index = this.courses.findIndex(c => c.id === id);
    this.courses[index] = course;
    this.courses[index].favorite = false;
  }

  search(term){
    // id, name, credits, subject
    let filter = (c) => {
      return new RegExp(term).test(c.name + c.subject) || new RegExp(term).test(String(c.id) + ' ' + String(c.credits))
    }

    return this.list(filter, 'SEARCHED COURSES: ' + term)
  }

  list(filter, label){
    let t = new Table({
      head: ['ID', 'NAME', 'CREDITS', 'SUBJECT'].map(
        col => chalk.cyan(col)
      )
    });

    let list = filter ? this.courses.filter(filter) : this.courses;

    list.forEach(c => {
      t.push([
        c.id, c.name, c.credits, c.subject
      ])
    })

    if (!t.length) t.push([{colSpan: 4, content:'no courses found'}])

    if (!label){
      console.log(chalk.bold.green('\nFULL COURSE LIST'))
    } else {
      console.log(chalk.bold.green(`\n${label}`))
    }

    console.log(t.toString() + '\n');
  }

  print(){
    console.log(`${this.username} has signed up for ${this.numEnrolled} ` +
      `course${this.numEnrolled === 1 ? '' : 's'} ` +
      `with ${this.creditsEnrolled} credits.`);
  }

  export(){
    return this.courses.reduce((str, c)=>{
      return str.concat(`${c.id} ${c.name} ${c.credits} ${c.subject}\n`)
    },'')
  }
}

module.exports = Courses;