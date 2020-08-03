const express = require('express');
const router = express.Router();
const esClient = require('../middleware/search/esClient');

// Check elastic health
router.get('/health', async (req, res, next) => {
  try {
    const { body } = await esClient.cluster.health();
    res.json(body.status);
  } catch (error) {
    next(error);
  }
});

// Get the search data
router.get('/search', async (req, res, next) => {
  const { query } = req.body;
  try {
    const { body } = await esClient.search({
      index: req.body.index,
      type: '_doc',
      body: {
        query: {
          match: {
            message: query,
          },
        },
      },
    });
    return res.json(body.hits.hits);
  } catch (err) {
    next(err);
  }
});

// router.get('/books/:book_id', (req, res) => {
//   Book.findOne({ _id: req.params.book_id }, (err, book) => {
//     if (err) return res.status(500).json({ error: err });
//     if (!book) return res.status(400).json({ error: 'book not found' });
//     res.json(book);
//   });
// });

// router.get('/books/author/:author', (req, res) => {
//   Book.find({ author: req.params.author }, (err, book) => {
//     if (err) return res.status(500).json({ error: err });
//     if (!book) return res.status(400).json({ error: 'book not found' });
//     console.log(book);
//     res.json(book);
//   });
// });

// // Create the book
// router.post('/books', (req, res) => {
//   const book = new Book();
//   book.title = req.body.title;
//   book.author = req.body.author;
//   book.published_date = moment(new Date(req.body.published_date), 'YYYY-MM-DD');

//   book.save((err) => {
//     if (err) {
//       console.error(err);
//       res.json({ result: 0 });
//       return;
//     }

//     res.json({ result: 1 });
//   });
// });

// // Update the book
// router.put('/books/:book_id', (req, res) => {
//   Book.update({ _id: req.params.book_id }, (err, output) => {
//     if (err) return res.status(500).json({ error: 'database failed' });
//     console.log('[output.n]' + JSON.stringify(output));
//     if (!output.n) return res.status(404).json({ error: 'book not found' });

//     res.json({ message: 'book updated' });
//   });
// });

// // Delete the book
// router.delete('/books/:book_id', (req, res) => {
//   Book.remove({ _id: req.params.book_id }, (err, output) => {
//     if (err) return res.status(500).json({ error: 'database failed' });
//     console.log(output);

//     res.status(204).end();
//   });
// });

module.exports = router;
