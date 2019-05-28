import {mongo, constants} from '../../utils/db.js';

export const init = async (req, h) => {
  return mongo(async db => {
    const users = db.collection(constants.users);
    const {name} = req.payload;

    // TODO: CREATE DB collections
    return await users.insertOne({name});
  });
};
