const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint


router.get('/', (req, res) => {
  const allTags = Tag.findAll({
    include: {Product},

  })
  res.status(200).json(allTags)
  if(!allTags){
    res.status(501)
    console.log("something is wrong with server, check tag get routes")
  }
  // find all tags
  // be sure to include its associated Product data
});

router.get('/:id', (req, res) => {
  const idTag = Tag.findByPk({
    where:  {id: req.params.id},
    include: {Product}
  })
  res.status(200).json(idTag)
  // find a single tag by its `id`
  // be sure to include its associated Product data
});

router.post('/', (req, res) => {
  const newTag = Tag.create({
    tag_name: req.body.tag_name
  })
  res.status(200).json(newTag)
  // create a new tag
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  const updateTag = Tag.update({
    tag_name: req.body.tag_name
  },
  {
    where: {
      id: req.params.id
    }
  })
  res.status(200).json(updateTag)
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  const deleteTag = Tag.destroy({
    where: {
      id: req.params.id
    }
  })
  res.status(200).json(deleteTag)
   
});

module.exports = router;
