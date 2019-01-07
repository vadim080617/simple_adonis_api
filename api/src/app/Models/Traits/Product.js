class Product {
  register(Model) {
    Model.getWithSortAndFilters = async ({ name = null, author = null, type = null }, { sortParams }) => {
      const products = await Model.query()
        .where(query => {
          if (type) {
            query.where('type_id', type);
          }
          if (author) {
            query.where('user_id', author);
          }
          if (name) {
            query.where('name', 'like', `%${name}%`);
          }
        })
        .with('attrValues.attr')
        .orderBy(...sortParams)
        .fetch();

      return products;
    };

    Model.createWithAddAttr = async (mainFields, additionlFields) => {
      const newProduct = await Model.create(mainFields);
      await Promise.all(
        additionlFields.map(async productAttr => {
          await newProduct.attrValues().create({
            product_id: newProduct.id,
            attr_id: productAttr.id,
            value: productAttr.value
          });
        })
      );

      const newProductWithAttr = await Model.query()
        .where('id', newProduct.id)
        .with('attrValues.attr')
        .first();
      return newProductWithAttr;
    };
  }
}

module.exports = Product;
