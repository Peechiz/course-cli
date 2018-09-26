# Course-CLI

I had fun making this little command line CRUD app.  I took partial inspiration from [this atlassian article](https://developer.atlassian.com/blog/2015/11/scripting-with-node/), but mainly spent my time staring at the usual smorgasbord of [mdn](https://developer.mozilla.org/en-US/), [the node.js docs](https://nodejs.org/dist/latest-v10.x/docs/api/), and [npm](https://www.npmjs.com/) to peruse a few of the other libraries.

### Tools Used
- [inquirer](https://github.com/SBoudrias/Inquirer.js/)
  - Super simple command line prompts, with simple validation
- [chalk](https://github.com/chalk/chalk)
  - pretty colors
- [cli-table3](https://github.com/cli-table/cli-table3)
  - because `cli-table` didn't have column spanning

## Usage:
```Shell
$ npm i -g
$ npm run test
$ course-cli [courses.txt]
```


## Assumptions

1. Credit hours have been capped at 10, although 4 or 5 is [probably the maximum](https://en.wikipedia.org/wiki/Course_credit#Credit_hours) for a single class at any university.

2. While `courses.txt` was provided, the application was built to accomodate any text file of similar format (or none) as input, i.e. 
```sh
$ course-cli other-courses.txt
```

3. It is assumed that if you make changes to the list of classes, you'd want those changes persisted in the text file, so the application writes out the full list of courses at the end of each session.


## Deviations

While the instructions called for the 'favorites' list to be inputted via a "comma separated list of ids", the library `inquirer` has a rather robust checkbox selector that I rather like, so I used that instead (because i have complete control over the input, it makes validation unneccesary).  Were I to have written it the other way, it would have been a fairly trivial matter to use a standard input `prompt` with tweaked filter and validation methods:

```javascript
  getFavorites(courses){
    return inquirer.prompt([
      {
        name: 'favorites',
        message: 'Select courses to enroll by id (commma separated)',
        choices: courses.selectCourses(),
        filter(favs){
          return favs.split(',').map(id => {
            return parseInt(id.trim())
          })
        },
        validate(favs){
          return favs.every(fav => Number.isInteger(fav) && String(fav).length === 5 && Courses.hasID(fav)) || 'Favorites must be comma separated 5 digit integers'
        }
      }
    ])
  }
```

As you can see, this method is more verbose, and it probably requires an additional `.hasID()` method on our `Courses` class.