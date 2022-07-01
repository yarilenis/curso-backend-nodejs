const faker = require('faker');

class UsersService {

  constructor() {
    this.users = [];
    this.generate();
  }

  generate() {
    const limit = 5;
    for (let index = 0; index < limit; index++) {
      this.users.push({
        id: faker.datatype.uuid(),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        gender: faker.name.gender(),
        job: faker.name.jobTitle()
      });
    }
  }

  create(data) {
    const newUser = {
      id: faker.datatype.uuid(),
      ...data
    }
    this.users.push(newUser);
    return newUser;
  }

  find() {
    return this.users;
  }

  findOne(id) {
    return this.users.find(item => item.id === id);
  }

  filter(name) {
    return this.users.filter(item => item.name.includes(name));
  }

  update(id, changes) {
    const index = this.users.findIndex(item => item.id === id);
    if (index !== -1) {
      throw new Error('Product no found');
    }

    const product = this.users[index];
    this.users[index] = {
      ...product,
      ...changes
    };
    return this.users[index];
  }

  delete(id) {
    const index = this.users.findIndex(item => item.id === id);
    if (index !== -1) {
      throw new Error('Product no found');
    }
    this.users.splice(index, 1);
    return {
      id,
      message: 'deleted'
    }
  }
}

module.exports = UsersService;
