import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const characterSchema = new Schema({
  name: String,
  player: String,
});

const Character = mongoose.model('Character', characterSchema);

export default Character;
