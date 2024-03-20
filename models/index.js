// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// Products belongsTo Category
Product.belongsTo(Category, {
  foreignKey: 'category_id'
});

// the foreign key in a model references the primary key of the model it will "belong to"

// Categories have many Products
Category.hasMany(Product, {
  foreignKey: 'category_id',
  onDelete: "CASCADE"
  //The onDelete attribute impacts what happens to a model that that belongs to one via a foreign key being deleted
  // if the primary key of a row stops exsiting, it will also delete the asociation
})
// Products belongToMany Tags (through ProductTag)
Product.belongsToMany(Tag, {
  through: ProductTag,
  foreignKey: 'product_id',
  onDelete: "CASCADE"
  //The onDelete attribute impacts what happens to a model that that belongs to one via a foreign key being deleted
  // if the primary key of a row stops exsiting, it will also delete the asociation
})


// Tags belongToMany Products (through ProductTag)
  Tag.belongsToMany( Product, {
    through: ProductTag,
    foreignKey: 'product_id',
    onDelete: "CASCADE"

  })
module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
