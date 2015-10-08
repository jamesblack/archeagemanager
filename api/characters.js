import express from 'express';
import mongoose from 'mongoose';

const router = express.Router();
const Character = mongoose.model('Character');

router.get('/characters', async (req, res) => {

  try {
    let characters = await Character.find();

    return res.send(characters);
  } catch (e) {
    console.error(e);
    return res.status(500).send(e);
  }

});

router.get('/characters/:id', async (req, res) => {
  try {
    let character = await Character.findById(req.params.id);

    return res.send(character);
  } catch (e) {
    console.error(e);
    return res.status(500).send(e);
  }
});

router.post('/characters', async (req, res) => {
  let character = new Character(req.body);
  character.owner = req.user.href;
  await character.save();
  return res.send(character);
});

router.post('/characters/:id', async (req, res) => {
  try {
    let character = await Character.findById(req.body._id);
    if (character.owner !== req.user.href) return res.send(401);
    character = await Character.update({ _id: req.body._id}, req.body);
    return res.send(character);
  } catch (e) {
    console.error(e);
    return res.status(500).send(e);
  }
});

export default router;
