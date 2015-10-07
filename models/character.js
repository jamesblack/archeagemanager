import mongoose from 'mongoose';
import { PROFESSIONS } from '../application/constants';

const Schema = mongoose.Schema;

const professionSchema = {
  value: { type: Number, default: 0 },
  preferred: { type: Boolean, default: false },
};

let schema = {
  name: String,
  owner: String,
  professions: {},
};

['harvesting', 'refining', 'misc'].forEach((title) => {
  let block = schema.professions[title] = {};
  PROFESSIONS[title].forEach((key) => {
    block[key] = professionSchema;
  });
});

const characterSchema = new Schema(schema);

const Character = mongoose.model('Character', characterSchema);

export default Character;
