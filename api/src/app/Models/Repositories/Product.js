class Product {
  static async getWithSortAndFilters({ name = null, author = null, type = null }, { sortParams }) {
    const products = await this.query()
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
      .with('attrs')
      .orderBy(...sortParams)
      .fetch();
    return products;
  }

  static async createWithAddAttr(mainFields, additionlFields) {
    const newProduct = await this.create(mainFields);
    await Promise.all(
      additionlFields.map(async productAttr => {
        await newProduct.attrs().attach([productAttr.id], row => {
          row.value = productAttr.value;
        });
      })
    );

    const newProductWithAttr = await this.query()
      .where('id', newProduct.id)
      .with('attrs')
      .first();
    return newProductWithAttr;
  }

  static async updateWithAddAttr(id, mainFields, additionlFields) {
    const updatingProduct = await this.findOrFail(id);
    updatingProduct.merge(mainFields);
    await updatingProduct.save();
    await Promise.all(
      additionlFields.map(productAttr => {
        return updatingProduct
          .attrs()
          .pivotQuery()
          .where('attr_id', productAttr.id)
          .update({ value: productAttr.value });
      })
    );

    return updatingProduct;
  }
}

module.exports = Product;