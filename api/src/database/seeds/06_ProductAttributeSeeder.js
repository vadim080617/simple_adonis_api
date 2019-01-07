const Product = use('App/Models/Product');
const ProductType = use('App/Models/ProductType');
const ProductAttributeValue = use('App/Models/ProductAttributeValue');

class ProductAttributeSeeder {
  async run() {
    await ProductAttributeValue.query().delete();
    const { rows: products } = await Product.all();
    await Promise.all(
      products.map(async product => {
        const productType = await ProductType.find(product.type_id);
        const { rows: productAttributes } = await productType.attributes().fetch();
        await Promise.all(
          productAttributes.map(async productAttr => {
            await product.attrValues().create({
              product_id: product.id,
              attr_id: productAttr.id,
              value: `value${Math.random() * 323423552}`
            });
          })
        );
      })
    );
  }
}

module.exports = ProductAttributeSeeder;
