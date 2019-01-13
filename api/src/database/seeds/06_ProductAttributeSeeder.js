const Product = use('App/Models/Product');
const Attribute = use('App/Models/Attribute');

class ProductAttributeSeeder {
  async run() {
    const { rows: products } = await Product.all();
    const { rows: attrs } = await Attribute.all();

    await Promise.all(
      products.map(async product =>
        Promise.all(
          attrs.map(async attr => {
            if (product.type_id === attr.type_id) {
              return product.attrs().attach([attr.id], row => {
                row.value = `value${Math.random() * 323423552}`;
              });
            }
            return 0;
          })
        )
      )
    );
  }
}

module.exports = ProductAttributeSeeder;
