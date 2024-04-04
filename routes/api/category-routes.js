const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint
//problem: Postman route requests respond with only a obeject contianing the properties isFullfilled and isRejected, both returning false.


;

router.get('/', async (req, res) => {
  try {
    const allCategories = await Category.findAll({ include: [{ model: Product }] });
    res.status(200).json(allCategories);
  } catch (error) {
    console.error("Error fetching all categories:", error);
    res.status(500).json({ error: "Something went wrong while fetching all categories" });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const idCategory = await Category.findByPk(id, { include: [{ model: Product }] });
    if (idCategory) {
      res.status(200).json(idCategory);
    } else {
      res.status(404).json({ error: "Category not found" });
    }
  } catch (error) {
    console.error("Error fetching category by ID:", error);
    res.status(500).json({ error: "Something went wrong while fetching the category" });
  }
});

router.post('/', async (req, res) => {
  try {
    const newCategory = await Category.create({ category_name: req.body.category_name });
    res.status(201).json(newCategory);
  } catch (error) {
    console.error("Error creating a new category:", error);
    res.status(500).json({ error: "Something went wrong while creating a new category" });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const updateCategory = await Category.update(
      { category_name: req.body.category_name },
      { where: { id: req.params.id } }
    );
    res.status(200).json(updateCategory).json({ message: "Category updated successfully" });
  } catch (error) {
    console.error("Error updating category:", error);
    res.status(500).json({ error: "Something went wrong while updating the category" });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deleteCategory = await Category.destroy({ where: { id: req.params.id } });
    res.status(200).json(deleteCategory).json({ message: "Category deleted successfully" });
  } catch (error) {
    console.error("Error deleting category:", error);
    res.status(500).json({ error: "Something went wrong while deleting the category" });
  }
});

module.exports = router;