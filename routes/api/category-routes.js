const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  try {
    const categoryData = await Category.findAll( {
      include: [{model: Product},]
    });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
  // find all categories
  // be sure to include its associated Products
});

router.get('/:id', async (req, res) => {
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{ model: Product}, ]
    });

    if(!categoryData) {
      res.status(404).json({ message: 'No category found with this id!'});
      return;
    }

    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
  // find one category by its `id` value
  // be sure to include its associated Products
});

router.post('/', async (req, res) => {
  try {
    const categoryData = await Category.create(req.body);
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(400).json(err);
  }
  // create a new category
});

router.put('/:category_id', (req, res) => {
  Category.update(
    {
      where: {
        category_id: req.params.category_id,
      },
    }
  )
    .then((updateCategory) => {
      res.json(updateCategory);
    })
    .catch ((err) => {
      console.log(err);
      res.json(err);
    });
  // update a category by its `id` value
});

router.delete('/:category_id', (req, res) => {
  Category.destroy({
    where: {
       category_id: req.params.category_id,
    },
  })
    .then((deletedTag) => {
      res.json(deletedTag);
    })
    .catch((err) => res.json (err));
  // delete a category by its `id` value
});

module.exports = router;
