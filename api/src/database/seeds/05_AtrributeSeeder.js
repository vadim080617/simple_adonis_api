const ProductType = use('App/Models/Type');
const Attribute = use('App/Models/Attribute');

class AtrributeSeeder {
  async run() {
    await Attribute.query().delete();
    const { rows: types } = await ProductType.all();
    await Promise.all(
      types.map(type =>
        Promise.all(
          Array.from({ length: 4 }).map((el, index) =>
            type.attributes().create({
              attribute: `${type.type}attr${index + 1}`
            })
          )
        )
      )
    );
  }
}

module.exports = AtrributeSeeder;
