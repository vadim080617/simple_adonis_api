const { validate } = use('Validator');
const Product = use('App/Models/Product');

class ProductController {
  async index({ request }) {
    const {type, name, author} = request.all();
    const sortString = request.input('sort') ? request.input('sort') : 'id|desc';
    const sortParams = sortString.split('|');
    const products = await Product.getWithSortAndFilters({type, name, author}, {sortParams});
    return products;
  }

  async store() {}

  async show({ params }) {
    const product = await Product.find(params.id);
    return product;
  }

  async update({ request, response, params}) {
    return {};
  }

  async destroy({ params, response }) {
    const product = await Product.find(params.id);

    await product.delete();

    return response.json({ msg: 'Ok' });
  }
}

module.exports = ProductController;
