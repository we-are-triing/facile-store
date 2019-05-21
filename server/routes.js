import {mongo} from './utils/db.js';
import Joi from '@hapi/joi';

export default server => {
  server.route([
    {
      method: `POST`,
      path: `/register`,
      options: {
        description: `User Registration`,
        notes: `API for regestering a user.`,
        tags: [`api`],
        validate: {
          payload: {
            name: Joi.string().required()
          }
        }
      },
      handler: async (req, h) => {
        return mongo(async db => {
          const users = db.collection('users');
          const {name} = req.payload;
          return await users.insertOne({name});
        });
      }
    },
    {
      method: `GET`,
      path: `/users`,
      options: {
        description: `Get All Users`,
        notes: `Shows all user info`,
        tags: [`api`]
      },
      handler: async (req, h) => {
        return mongo(async db => {
          const users = db.collection('users');
          return await users.find({}).toArray();
        });
      }
    }
  ]);
};
