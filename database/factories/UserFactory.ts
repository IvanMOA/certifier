import User from 'App/Models/User'
import Factory from '@ioc:Adonis/Lucid/Factory'
import { Role } from 'App/Models/Role'

export default Factory.define(User, ({ faker }) => {
  return {
    email: faker.internet.email(),
    password: faker.internet.password(),
    name: faker.name.firstName(),
    lastName: faker.name.lastName(),
    age: faker.datatype.number({ min: 18, max: 99 }),
    company: faker.company.companyName(),
    role: 'user' as Role,
  }
}).build()
