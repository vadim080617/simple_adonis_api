const ProductType = use('App/Models/Type');

class TypeController {
  async index() {
    const productTypes = await ProductType.all();
    return productTypes;
  }

  async store({ request }) {
    const { type } = request.all();
    const newProductType = await ProductType.create({
      type
    });
    return newProductType;
  }

  async show({ params }) {
    const protuctType = await ProductType.find(params.id);
    return protuctType;
  }

  async update({ request, params }) {
    const { type } = request.all();
    const updatingProduct = await ProductType.find(params.id);
    updatingProduct.merge({ type });
    await updatingProduct.save();
    return updatingProduct;
  }

  async destroy({ params, response }) {
    const type = await ProductType.find(params.id);

    await type.delete();

    return response.json({ msg: 'Ok' });
  }
}

module.exports = TypeController;
