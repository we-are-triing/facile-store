import {mongo} from '../../utils/db.js';

export const init = async (req, h) => {
  return mongo(async db => {
    const users = db.collection('users');
    const {name} = req.payload;
    return await users.insertOne({name});
  });
};

/*

Content structure - the filled out templates and components
[templates]
*/
