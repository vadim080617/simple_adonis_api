const Product = use('App/Models/Product');
const User = use('App/Models/User');
const ProductType = use('App/Models/ProductType');

class ProductSeeder {
  async run() {
    await Product.query().delete();

    let users = await User.all();
    users = users.toJSON();

    let productTypes = await ProductType.all();
    productTypes = productTypes.toJSON();

    await Promise.all(
      users.map(async user => {
        await Promise.all(
          productTypes.map(async productType => {
            await Product.create({
              name: `${productType.type}${new Date().getTime()}`,
              type_id: productType.id,
              user_id: user.id,
              price: Math.random() * 10000
            });
          })
        );
      })
    );
  }
}

module.exports = ProductSeeder;
