const ProductType = use('App/Models/Type');

class TypeController {
  async index() {
    const productTypes = await ProductType.all();
    return productTypes;
  }

  async store({ request, response }) {
    const newProductType = await ProductType.create({
      type: request.input('type')
    });
    response.status(201).send(newProductType);
  }

  async show({ params }) {
    const protuctType = await ProductType.find(params.id);
    return protuctType;
  }

  async update({ request, params }) {
    const updatingProduct = await ProductType.mergeUpdate({ id: params.id, type: request.input('type') });
    return updatingProduct;
  }

  async destroy({ params, response }) {
    const type = await ProductType.find(params.id);

    await type.delete();

    return response.json({ msg: 'Ok' });
  }
}

module.exports = TypeController;
