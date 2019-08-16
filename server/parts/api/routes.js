import {getById, getByPath} from './api.js';
import joi from '@hapi/joi';

const nameReg = /[a-zA-Z0-9 _\-]+/;
const pathReg = /[a-zA-Z0-9 _\-/]+/;

const idValidation = {
  id: joi
    .string()
    .regex(nameReg)
    .required()
};

const pathValidation = {
  path: joi
    .string()
    .regex(pathReg)
    .required()
};

export default server => {
  server.route([
    {
      method: `GET`,
      path: `/api/{id}`,
      options: {
        description: `External Content api, this uses the name of the content.`,
        notes: `This uses the user defined ID for the template.`,
        tags: [`api`],
        validate: {
          params: idValidation
        }
      },
      handler: getById
    },
    {
      method: `GET`,
      path: `/api/{path*}`,
      options: {
        description: `External Content api, this uses the path to get the content.`,
        notes: `This uses the user defined path to get the content.`,
        tags: [`api`],
        validate: {
          params: pathValidation
        }
      },
      handler: getByPath
    }
  ]);
};
