import {mongo} from '../../utils/db.js';

export const init = async (req, h) => {
  return mongo(async db => {
    const users = db.collection('users');
    const {name} = req.payload;

    // TODO: CREATE DB collections
    return await users.insertOne({name});
  });
};
