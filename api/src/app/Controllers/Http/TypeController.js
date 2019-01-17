const ProductType = use('App/Models/ProductType');

class TypeController {
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

module.exports = TypeController;
