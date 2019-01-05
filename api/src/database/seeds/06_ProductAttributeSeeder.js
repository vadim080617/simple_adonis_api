const Product = use('App/Models/Product');
const ProductType = use('App/Models/ProductType');
const ProductAttributeValue = use('App/Models/ProductAttributeValue');

class ProductAttributeSeeder {
  async run () {
    await ProductAttributeValue.query().delete();
    const { rows: products } = await Product.all();
    for(let i = 0; i < products.length; i++) {
      const product = products[i];
      const productType = await ProductType.find(product.type_id);
      const { rows: productAttributes } = await productType.attributes().fetch();
      for(let j = 0; j < productAttributes.length; j++){
        const productAttr = productAttributes[j];
        await product.attrValues().create({
          product_id: product.id,
          attr_id: productAttr.id,
          value: `value${Math.random()*323423552}`
        });
      }
    }
  }
}

module.exports = ProductAttributeSeeder
