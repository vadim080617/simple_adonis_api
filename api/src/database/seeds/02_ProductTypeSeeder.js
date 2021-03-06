const ProductType = use('App/Models/Type');

class ProductTypeSeeder {
  async run() {
    await ProductType.query().delete();

    const types = [{ type: 'notebook' }, { type: 'phone' }, { type: 'car' }];

    await ProductType.createMany(types);
  }
}

module.exports = ProductTypeSeeder;
