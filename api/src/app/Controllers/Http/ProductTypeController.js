const ProductType = use('App/Models/ProductType');

class ProductTypeController {
  async index() {
    return await ProductType.all();
  }

  async store() {}

  async show() {}

  async update() {}

  async destroy() {}
}

module.exports = ProductTypeController;
