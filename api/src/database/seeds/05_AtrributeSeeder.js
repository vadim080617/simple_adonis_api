const ProductType = use('App/Models/ProductType');
const Attribute = use('App/Models/Attribute');

class AtrributeSeeder {
  async run() {
    await Attribute.query().delete();
    const { rows: types } = await ProductType.all();
    await Promise.all(
      types.map(async type => {
        await Promise.all(
          [1, 2, 3, 4].map(async el => {
            await type.attributes().create({
              attribute: `${type.type}attr${el}`
            });
          })
        );
      })
    );
  }
}

module.exports = AtrributeSeeder;
