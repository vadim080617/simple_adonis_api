const Product = use('App/Models/Product');

class ProductController {
  async index({ request }) {
    const { type, name, author, sort } = request.all();
    const products = await Product.getWithSortAndFilters({ type, name, author }, { sort });
    return products;
  }

  async store({ request, response }) {
    const { name, type: typeId, author: userId, price, attrs } = request.only([
      'name',
      'type',
      'author',
      'price',
      'attrs'
    ]);

    const newProduct = await Product.createWithAddAttr({ name, type_id: typeId, user_id: userId, price }, attrs);
    response.status(201).send(newProduct);
  }

  async show({ params }) {
    const product = await Product.query()
      .where('id', params.id)
      .with('attrs')
      .with('user')
      .with('type')
      .firstOrFail();
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
    const updatedProduct = await Product.updateWithAddAttr(
      params.id,
      { name, type_id: typeId, user_id: userId, price },
      attrs
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
