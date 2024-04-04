const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// The `/api/products` endpoint

// get all products
router.get('/', async (req, res) => {

  try {
    const allProducts = await Product.findAll({
      include: [{model:Category}, {model:Tag}]
    });
    res.status(200).json(allProducts);
    console.log(JSON.stringify(allProducts));
  } catch (err) {
    res.status(400).json(err);
  }

});

// get one product
router.get('/:id', async (req, res) => {

  try {
    const idProduct = await Product.findByPk(req.params.id, {
      include: [{model:Category}, {model:Tag}]
    });
    res.status(200).json(idProduct);
  } catch (err) {
    res.status(400).json(err);
  }

});

// create new product
router.post('/', async (req, res) => {
  
  try {
    const product = await Product.create(req.body);

    if (req.body.tagIds && req.body.tagIds.length) {
      const productTagIdArr = req.body.tagIds.map((tag_id) => {
        return {
          product_id: product.id,
          tag_id,
        };
      });
      await ProductTag.bulkCreate(productTagIdArr);
    }

    res.status(200).json(product);

  } catch (err) {
    res.status(400).json(err);
  }

});

// update product
router.put('/:id', async (req, res) => {

  try {
    const product = await Product.findByPk(req.params.id);

    await product.update(req.body);

    if (req.body.tagIds && req.body.tagIds.length) {

      const productTags = await ProductTag.findAll({ where: { product_id: req.params.id } });

      const productTagIds = productTags.map(({ tag_id }) => tag_id);
      const newProductTags = req.body.tagIds
        .filter((tag_id) => !productTagIds.includes(tag_id))
        .map((tag_id) => {
          return {
            product_id: req.params.id,
            tag_id,
          };
        });

      const productTagsToRemove = productTags
        .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
        .map(({ id }) => id);

      await Promise.all([
        ProductTag.destroy({ where: { id: productTagsToRemove } }),
        ProductTag.bulkCreate(newProductTags),
      ]);

    }

    res.json(product);

  } catch (err) {
    res.status(400).json(err);
  }

});

router.delete('/:id', async (req, res) => {

  try {
    const deleteProduct = await Product.destroy({
      where: {
        id: req.params.id
      }
    });
    res.status(200).json(deleteProduct);
  } catch (err) {
    res.status(400).json(err);
  }

});

module.exports = router;


