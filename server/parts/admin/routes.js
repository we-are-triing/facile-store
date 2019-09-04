import {getAllUsers, registerUsers} from './users.js';
import {init, getSiteData} from './site.js';
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
            id: joi.string().required(),
            secret: joi.string().required()
          }
        }
      },
      handler: init
    },
    {
      method: `GET`,
      path: `/admin/site`,
      options: {
        description: `Get site data`,
        notes: `Shows all site data`,
        tags: [`api`]
      },
      handler: getSiteData
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
