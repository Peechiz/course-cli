#!/usr/bin/env node

const readline = require('readline');
const fs = require('fs');

const q = require('./lib/questions');
const Courses = require('./lib/courses');
const { parseCourse, actionLoop } = require('./lib/util')

const file = process.argv[2] || 'courses.txt'

let courses = new Courses();

// if courses file exsits
if (fs.existsSync(file)){
  const rl = readline.createInterface({
    input: fs.createReadStream(file),
  })

  rl.on('line', line => {
    courses.add(parseCourse(line))
  }).on('close', () => {
    run();
  })

} else {
  run();
}

function run(){
  // courses loaded
  courses.list();

  // begin CLI
  q.getName()
  .then(answer => {
    courses.user = answer.name;
  })
  .then(() => {
    return actionLoop(courses);
  })
  .then(({ favorites }) => {
    courses.setFavorites(favorites);
    courses.list(c => c.favorite, 'enrolled courses');
    courses.print();
  })
  .then(() => {
    // write to courses.txt
    const data = courses.export();
    fs.writeFile(file, data, err => {
      if (err) throw err;
      console.log('Courses updated. Goodbye.')
    })
  })
}

// 1. ask name
// 2. prompt action
  // additional operations?
    // true => prompt action
    // false => prompt favorites

// 3. print favorites
// 4. re-write to courses.txt
// 5. terminate