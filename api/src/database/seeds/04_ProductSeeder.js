const User = use('App/Models/User');
const Product = use('App/Models/Product');
const Factory = use('Factory');
const ProductType = use('App/Models/Type');

class ProductSeeder {
  async run() {
    await Product.query().delete();

    const { rows: users } = await User.all();

    const { rows: productTypes } = await ProductType.all();

    await Promise.all(
      users.map(user =>
        Promise.all(
          productTypes.map(productType =>
            Factory.model('App/Models/Product').create({ type_id: productType.id, user_id: user.id })
          )
        )
      )
    );
  }
}

module.exports = ProductSeeder;
