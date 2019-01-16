const Product = use('App/Models/Product');
const User = use('App/Models/User');
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
            Product.create({
              name: `${productType.type}${new Date().getTime()}`,
              type_id: productType.id,
              user_id: user.id,
              price: Math.random() * 10000
            })
          )
        )
      )
    );
  }
}

module.exports = ProductSeeder;
