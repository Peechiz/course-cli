const Courses = require('../lib/courses');

let courses = new Courses();

// beforeEach(() => {
//
// });

describe('Courses', ()=>{
  describe('constructor', ()=>{
    it('has no courses to start', ()=>{
      expect(courses.courses.length).toBe(0);
    })
    it('has no user to start', ()=>{
      expect(courses.user).toBe('')
    })
  })

  describe('functions', ()=>{
    let course1 = {
      id: 12345,
      name: 'Metal Smithing',
      credits: 3,
      subject: 'ART'
    };
    let course2 = {
      id: 54321,
      name: 'Smith Metalling',
      credits: 6,
      subject: 'TAR'
    };
    it('should add a course', ()=>{
      courses.add(course1)
      courses.add(course2)
      expect(courses.courses.length).toBe(1);
      expect(courses.courses[0]).toBeTruthy();
      expect(courses.courses[0]).toMatchObject(course1);
    })

    it('should find a course by id', ()=>{
      expect(courses.id(12345)).toMatchObject(course1)
    })

  })
})