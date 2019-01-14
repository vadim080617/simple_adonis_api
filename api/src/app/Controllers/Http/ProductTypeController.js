const ProductType = use('App/Models/ProductType');

class ProductTypeController {
  async index() {
    const types = await ProductType.all();
    return types;
  }

  async store() {
    return {};
  }

  async show() {
    return {};
  }

  async update() {
    return {};
  }

  async destroy() {
    return {};
  }
}

module.exports = ProductTypeController;
