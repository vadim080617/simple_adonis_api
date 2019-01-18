class Type {
  static async mergeUpdate({ id, type }) {
    const updatingProduct = await this.find(id);
    updatingProduct.merge({ type });
    await updatingProduct.save();
    return updatingProduct;
  }
}

module.exports = Type;