const faker = require('faker');
const boom = require('@hapi/boom');

class ProductsService {

  constructor() {
    this.products = [];
    this.generate();
  }

  generate() {
    const limit = 3;
    for (let index = 0; index < limit; index++) {
      this.products.push({
        id: faker.datatype.uuid(),
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price(), 10),
        image: faker.image.imageUrl(),
        isBlock: faker.datatype.boolean(),
      });
    }
  }

  create(data) {
    const newProduct = {
      id: faker.datatype.uuid(),
      ...data
    }
    this.products.push(newProduct);
    return newProduct;
  }

  find() {
    return new Promise((resolver, reject) => {
      setTimeout(() => {
        resolver(this.products);
      }, 5000);
    });
  }

  findOne(id) {
    const product = this.products.find(item => item.id === id);
    if (!product) {
      throw boom.notFound('Product no found');
    }
    if (product.isBlock) {
      throw boom.conflict('Product is block');
    }
    return product;
  }

  filter(name) {
    return this.products.filter(item => item.name.includes(name));
  }

  async update(id, changes) {
    const index = this.products.findIndex(item => item.id === id);

    if (index === -1) {
      throw boom.notFound('Product no found');
    }

    const product = this.products[index];
    this.products[index] = {
      ...product,
      ...changes
    };

    return this.products[index];
  }

  delete(id) {
    const index = this.products.findIndex(item => item.id === id);
    if (index !== -1) {
      throw boom.notFound('Product no found');
    }
    this.products.splice(index, 1);
    return {
      id,
      message: 'deleted'
    }
  }
}

module.exports = ProductsService;
