const ProductType = use('App/Models/Type');

class AttributeController {
  async index({ params }) {
    const productType = await ProductType.findOrFail(params.id);
    const attrs = productType.attributes().fetch();
    return attrs;
  }

  async store({ params, request }) {
    const { attribute } = request.all();
    const productType = await ProductType.findOrFail(params.id);
    const newAttr = productType.attributes().create({
      attribute
    });
    return newAttr;
  }

  async update({ params, request }) {
    const productType = await ProductType.findOrFail(params.id);
    await productType
      .attributes()
      .where('id', params.attrid)
      .update({
        attribute: request.input('attribute')
      });
    const updatedAttr = await productType
      .attributes()
      .where('id', params.attrid)
      .first();
    return updatedAttr;
  }

  async show({ params }) {
    const productType = await ProductType.findOrFail(params.id);
    const attr = await productType
      .attributes()
      .where('id', params.attrid)
      .first();
    return attr;
  }

  async destroy({ params, response }) {
    const productType = await ProductType.findOrFail(params.id);
    await productType
      .attributes()
      .where('id', params.attrid)
      .delete();
    return response.json({ msg: 'Ok' });
  }
}

module.exports = AttributeController;
