const ProductType = use('App/Models/Type');
const Attribute = use('App/Models/Attribute');

class AtrributeSeeder {
  async run() {
    await Attribute.query().delete();
    const { rows: types } = await ProductType.all();
    await Promise.all(
      types.map(type =>
        Promise.all(
          [1, 2, 3, 4].map(el =>
            type.attributes().create({
              attribute: `${type.type}attr${el}`
            })
          )
        )
      )
    );
  }
}

module.exports = AtrributeSeeder;
