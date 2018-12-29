const ProductType = use('App/Models/ProductType');

class ProductTypeSeeder {
  async run() {
    const types = [{ type: 'phone' }, { type: 'car' }, { type: 'pen' }, { type: 'bike' }];
    for(let i = 0; i < types.length; i++){
      const type = types[i];
      const findingObj = { id: i + 1, ...type };
      await ProductType.findOrCreate(findingObj, findingObj);
    }
  }
}

module.exports = ProductTypeSeeder
