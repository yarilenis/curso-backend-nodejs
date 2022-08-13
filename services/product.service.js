const boom = require('@hapi/boom');
const { Op } = require('sequelize');
const { models } = require('../libs/sequelize');

class ProductsService {

  constructor() {}

  async create(data) {
    const newProduct = await models.Product.create(data);
    return newProduct;
  }

  async find(query) {
    const { limit, offset, price, price_min, price_max } = query;
    const options = {
      include: ['category'],
      where: {}
    };
    if(limit && offset) {
      options.limit = limit;
      options.offset = offset;
    }
    if(price)
      options.where.price = price;

    if(price_min && price_max) {
      options.where.price = {
        [Op.gte]: price_min,
        [Op.lte]: price_max
      };
    }
    const products = await models.Product.findAll(options);
    return products;
  }

  async findOne(id) {
    const product = await models.Product.findByPk(id);
    if (!product)
      throw boom.notFound('Product not found');

    if (product.isBlock)
      throw boom.conflict('Product is block');

    return product;
  }

  async update(id, changes) {
    const model = await this.findOne(id);
    const rta = await model.update(changes);
    return rta;
  }

  async delete(id) {
    const model = await this.findOne(id);
    await model.destroy();
    return { rta: true };
  }

}

module.exports = ProductsService;
