import {mongo, constants, hasItem} from '../../utils/db.js';
import boom from '@hapi/boom';

export const init = async (req, h) => {
  return mongo(async db => {
    const admin = db.collection(constants.admin);
    const {org, id, secret} = req.payload;

    if (await hasItem(admin, {})) {
      return boom.badRequest(`The site has already been inited!`);
    }
    return await admin.insertOne({org, id, secret});
  });
};

export const getSiteData = async (req, h) => {
  return mongo(async db => {
    const admin = db.collection(constants.admin);
    const temp = await admin.find({}).toArray();
    return {org: temp[0].org, id: temp[0].id};
  });
};
