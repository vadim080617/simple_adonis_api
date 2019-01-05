const ProductType = use('App/Models/ProductType');
const Attribute = use('App/Models/Attribute');

class AtrributeSeeder {
  async run () {
    await Attribute.query().delete();
    const { rows: types } = await ProductType.all();
    for(let i=0; i < types.length; i++) {
      const type = types[i];
      for(let j = 1; j < 4; j++){
        await type.attributes().create({
          attribute: `${type.type}attr${j}`
        });
      }
    }
  }
}

module.exports = AtrributeSeeder
