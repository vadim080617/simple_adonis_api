const { validate } = use('Validator');
const Product = use('App/Models/Product');

class ProductController {
  async index({ request, response }) {
    const rules = {
      type: 'integer',
      name: 'string',
      author: 'integer',
      sort: 'string'
    };

    const validation = await validate(request.all(), rules);
    if (validation.fails()) {
      return response.status(422).json({
        errors: validation.messages()
      });
    }

    const sortString = request.input('sort') ? request.input('sort') : 'id|desc';
    const sortParams = sortString.split('|');

    const products = await Product.query()
      .where(query => {
        if (request.input('type')) {
          query.where('type_id', request.input('type'));
        }
        if (request.input('author')) {
          query.where('user_id', request.input('author'));
        }
        if (request.input('name')) {
          query.where('name', 'like', `%${request.input('name')}%`);
        }
      })
      .orderBy(...sortParams)
      .fetch();
    return products;
  }

  async store() {} //TODO

  async show({ params }) {
    const product = await Product.find(params.id);
    return product;
  }

  async update({ request, response, params}) { //TODO
    const rules = {
      type: 'integer',
      name: 'string',
      author: 'integer',
      sort: 'string'
    };

    const validation = await validate(request.all(), rules);
    if (validation.fails()) {
      return response.status(422).json({
        errors: validation.messages()
      });
    }

    // const product = Product.find(params.id);
    // const body = request.only(['username', 'email', 'age'])
    return {};
  }

  async destroy({ params }) {
    const product = await Product.find(params.id);

    await product.delete();

    return {};
  }
}

module.exports = ProductController;
