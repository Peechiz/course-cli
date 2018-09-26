const Courses = require('../lib/courses');

let courses = new Courses();

describe('Courses', ()=>{
  describe('constructor', ()=>{
    it('has no courses to start', ()=>{
      expect(courses.courses.length).toBe(0);
    })
    it('has no user to start', ()=>{
      expect(courses.user).toBe('')
    })
  })

  describe('methods', ()=>{
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
    let course3 = {
      id: 11223,
      name: 'Swimming',
      credits: 1,
      subject: 'SPORT'
    }

    it('should add courses', ()=>{
      courses.add(course1)
      courses.add(course2)
      expect(courses.courses.length).toBe(2);
      expect(courses.courses[0]).toBeTruthy();
      expect(courses.courses[0]).toMatchObject(course1);
    })

    it('should find a course by id', ()=>{
      expect(courses.id(12345)).toMatchObject(course1)
    })

    it('should return course selection map', ()=>{
      expect(courses.selectCourses()[0]).toMatchObject({
        name: '12345 Metal Smithing',
        value: 12345,
        short: 12345
      })
    })

    it('should set favorites', ()=>{
      courses.setFavorites([12345]);
      expect(courses.courses[0]).toHaveProperty('favorite', true)
    })

    it('should return enrolled', ()=>{
      expect(courses.enrolled[0]).toMatchObject({
        favorite: true,
        ...course1
      })
    })
    it('should count enrolled', ()=>{
      expect(courses.numEnrolled).toBe(1);
    })
    it('should count total credits', ()=>{
      expect(courses.creditsEnrolled).toBe(3)
    })

    it('should update a course', ()=>{
      courses.update(54321, course3)
      expect(courses.courses[1]).toMatchObject(course3);
      expect(courses.courses[1]).toHaveProperty('favorite', false);
    })

    it('should search courses', ()=>{
      const spy = jest.spyOn(Courses.prototype, 'list');
      courses.search('ART')
      expect(spy).toHaveBeenCalled()
    })

    it('should export all courses', ()=>{
      expect(courses.export()).toBe(
        `${course1.id} ${course1.name} ${course1.credits} ${course1.subject}\n` +
        `${course3.id} ${course3.name} ${course3.credits} ${course3.subject}\n`
      )
    })

    it('should list courses', ()=>{
      const spy = jest.spyOn(global.console, 'log');
      courses.list()
      expect(spy).toHaveBeenCalled();
    })

    it('should print enrolled courses', ()=>{
      const spy = jest.spyOn(global.console, 'log');
      courses.print()
      expect(spy).toHaveBeenCalled();
    })

  })
})