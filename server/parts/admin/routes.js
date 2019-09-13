import {getAllUsers, registerUser, checkAdmin, getUser} from './users.js';
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
            id: joi.string().required(),
            profile: {
              name: joi.string().required(),
              email: joi.string().required(),
              img: joi.string().required()
            },
            roles: joi
              .array()
              .items(joi.string())
              .required(),
            admin: joi.boolean().required(),
            translator: joi.array().items(joi.string())
          }
        }
      },
      handler: registerUser
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
    },
    {
      method: `GET`,
      path: `/admin/user/{id}`,
      options: {
        description: `Get All Users`,
        notes: `Shows all user info 😋`,
        tags: [`api`],
        validate: {
          params: {
            id: joi.string().required()
          }
        }
      },
      handler: getUser
    },
    {
      method: `GET`,
      path: `/admin/checkAdmin`,
      options: {
        description: `Get All Users`,
        notes: `Shows all user info 😋`,
        tags: [`api`]
      },
      handler: checkAdmin
    }
  ]);
};
