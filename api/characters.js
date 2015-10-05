import express from 'express';

const router = express.Router();

router.get('/characters', (req, res) => {
  res.send({});
});

export default router;
