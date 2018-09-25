const q = require('./questions');
const actions = require('./actions');

const util = {
    actionLoop(courses) {
      return q.getAction()
        .then(({ action }) => {
          return actions[action](courses);
        })
        .then(() => {
          return q.doMore();
        })
        .then(answer => {
          if (answer.continue) {
            return util.actionLoop(courses);
          } else {
            return q.getFavorites(courses);
          }
        })
    },
    parseCourse(line) {
      let arr = line.split(' ');
      return {
        id: parseInt(arr[0]),
        name: arr.slice(1, arr.length - 2).join(' '),
        credits: parseInt(arr[arr.length - 2]),
        subject: arr[arr.length - 1],
      }
    }
  }

module.exports = util;