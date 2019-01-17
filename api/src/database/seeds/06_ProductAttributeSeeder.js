const Product = use('App/Models/Product');
const Attribute = use('App/Models/Attribute');

class ProductAttributeSeeder {
  async run() {
    const { rows: products } = await Product.all();
    const { rows: attrs } = await Attribute.all();

    await Promise.all(
      products.map(product =>
        Promise.all(
          attrs.filter(attr => product.type_id === attr.type_id).map(attr => {
            return product.attrs().attach([attr.id], row => {
              row.value = `value${Math.random() * 323423552}`;
            });
          })
        )
      )
    );
  }
}

module.exports = ProductAttributeSeeder;
