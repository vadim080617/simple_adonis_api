class Product {
  register (Model, customOptions = {}) {
    const defaultOptions = {};
    const options = Object.assign(defaultOptions, customOptions);

    Model.getWithSortAndFilters = async ({name = null, author = null, type = null}, {sortParams}) => {
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
        .orderBy(...sortParams)
        .fetch();

      return products;
    };
  }
}

module.exports = Product
