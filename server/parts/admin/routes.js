import {getAllUsers, registerUsers} from './users.js';
import {init} from './site.js';
import joi from '@hapi/joi';

export default server => {
  server.route([
    {
      method: `POST`,
      path: `/admin/init`,
      options: {
        description: `endpoint for initing the application.`,
        notes: `This can only be run once. Once successful, you can't init again.`,
        tags: [`api`],
        validate: {
          payload: {
            org: joi.string().required(),
            clientId: joi.string().required(),
            clientSecret: joi.string().required(),
            name: joi.string().required(),
            image: joi.string(),
            email: joi.string(),
            token: joi.string().required()
          }
        }
      },
      handler: init
    },
    {
      method: `POST`,
      path: `/admin/register`,
      options: {
        description: `User Registration`,
        notes: `API for regestering a user. 🤓`,
        tags: [`api`],
        validate: {
          payload: {
            name: joi.string().required()
          }
        }
      },
      handler: registerUsers
    },
    {
      method: `GET`,
      path: `/admin/users`,
      options: {
        description: `Get All Users`,
        notes: `Shows all user info 😋`,
        tags: [`api`]
      },
      handler: getAllUsers
    }
  ]);
};
