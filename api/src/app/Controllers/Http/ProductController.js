const Product = use('App/Models/Product');
const ProductType = use('App/Models/Type');

class ProductController {
  async index({ request }) {
    const { type, name, author } = request.all();
    const sortString = request.input('sort') ? request.input('sort') : 'id|desc';
    const sortParams = sortString.split('|');
    const products = await Product.getWithSortAndFilters({ type, name, author }, { sortParams });
    return products;
  }

  async store({ request }) {
    const { name, type: typeId, author: userId, price, attrs } = request.only([
      'name',
      'type',
      'author',
      'price',
      'attrs'
    ]);
    const productType = await ProductType.find(request.input('type'));
    const { rows: attributes } = await productType.attributes().fetch();
    attributes.map(el => {
      el.value = attrs[el.attribute];
      return el;
    });
    const newProduct = await Product.createWithAddAttr({ name, type_id: typeId, user_id: userId, price }, attributes);
    return newProduct;
  }

  async show({ params }) {
    const product = await Product.query()
      .where('id', params.id)
      .with('attrValues.attr')
      .first();
    return product;
  }

  async update({ request, params }) {
    const { name, type: typeId, author: userId, price, attrs } = request.only([
      'name',
      'type',
      'author',
      'price',
      'attrs'
    ]);
    const productType = await ProductType.find(request.input('type'));
    const { rows: attributes } = await productType.attributes().fetch();
    attributes.map(el => {
      el.value = attrs[el.attribute];
      return el;
    });
    const updatedProduct = await Product.updateWithAddAttr(
      params.id,
      { name, type_id: typeId, user_id: userId, price },
      attributes
    );
    return updatedProduct;
  }

  async destroy({ params, response }) {
    const product = await Product.find(params.id);

    await product.delete();

    return response.json({ msg: 'Ok' });
  }
}

module.exports = ProductController;
