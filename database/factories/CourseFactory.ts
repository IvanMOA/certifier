import Factory from '@ioc:Adonis/Lucid/Factory'
import Course from 'App/Models/Course'

export default Factory.define(Course, ({ faker }) => {
  return {
    name: faker.name.firstName(),
    duration: faker.datatype.number({ min: 18, max: 99 }),
  }
}).build()
