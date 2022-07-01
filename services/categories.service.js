const faker = require('faker');

class CategoriesService {

  constructor() {
    this.categories = [];
    this.generate();
  }

  generate() {
    const limit = 5;
    for (let index = 0; index < limit; index++) {
      this.categories.push({
        id: faker.datatype.uuid(),
        name: faker.commerce.department()
      });
    }
  }

  create(data) {
    const newCategory = {
      id: faker.datatype.uuid(),
      ...data
    }
    this.categories.push(newCategory);
    return newCategory;
  }

  find() {
    return this.categories;
  }

  findOne(id) {
    return this.categories.find(item => item.id === id);
  }

  filter(name) {
    return this.categories.filter(item => item.name.includes(name));
  }

  update(id, changes) {
    const index = this.categories.findIndex(item => item.id === id);
    if (index !== -1) {
      throw new Error('Product no found');
    }

    const product = this.categories[index];
    this.categories[index] = {
      ...product,
      ...changes
    };
    return this.categories[index];
  }

  delete(id) {
    const index = this.categories.findIndex(item => item.id === id);
    if (index !== -1) {
      throw new Error('Product no found');
    }
    this.categories.splice(index, 1);
    return {
      id,
      message: 'deleted'
    }
  }
}

module.exports = CategoriesService;
