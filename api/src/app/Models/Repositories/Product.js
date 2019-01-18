const ProductType = use('App/Models/Type');

class Product {
  static async getWithSortAndFilters({ name = null, author = null, type = null }, { sort }) {
    const sortString = sort || 'id|desc';
    const sortParams = sortString.split('|');
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

  static async createWithAddAttr(mainFields, attrs) {
    const productType = await ProductType.find(mainFields.type_id);
    const { rows: attributes } = await productType.attributes().fetch();
    attributes.map(el => {
      el.value = attrs[el.attribute];
      return el;
    });
    const newProduct = await this.create(mainFields);
    await Promise.all(
      attributes.map(async productAttr => {
        await newProduct.attrs().attach([productAttr.id], row => {
          row.value = productAttr.value;
        });
      })
    );

    const newProductWithAttr = await this.query()
      .where('id', newProduct.id)
      .with('type')
      .with('user')
      .first();
    return newProductWithAttr;
  }

  static async updateWithAddAttr(id, mainFields, attrs) {
    const productType = await ProductType.find(mainFields.type_id);
    const { rows: attributes } = await productType.attributes().fetch();
    attributes.map(el => {
      el.value = attrs[el.attribute];
      return el;
    });
    const updatingProduct = await this.findOrFail(id);
    updatingProduct.merge(mainFields);
    await updatingProduct.save();
    await Promise.all(
      attributes.map(productAttr => {
        return updatingProduct
          .attrs()
          .pivotQuery()
          .where('attr_id', productAttr.id)
          .update({ value: productAttr.value });
      })
    );

    const updatedProductWithAttr = await this.query()
      .where('id', updatingProduct.id)
      .with('type')
      .with('user')
      .first();

    return updatedProductWithAttr;
  }
}

module.exports = Product;