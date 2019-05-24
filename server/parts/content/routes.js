import joi from '@hapi/joi';
import {getTemplates, createTemplate, updateTemplate, getTemplate, deleteTemplate} from './templates.js';

export default server => {
  server.route([
    {
      method: `GET`,
      path: `/content/templates`,
      options: {
        description: `Get all templates`,
        notes: `this is not the content, but the templates to fill out.`,
        tags: [`api`, `content`, `template`]
      },
      handler: getTemplates
    },
    {
      method: `GET`,
      path: `/content/template/{type}`,
      options: {
        description: `Get all templates`,
        notes: `this is not the content, but the templates to fill out.`,
        tags: [`api`, `content`, `template`],
        validate: {
          params: {
            type: joi.string()
          }
        }
      },
      handler: getTemplate
    },
    {
      method: `POST`,
      path: `/content/template/create`,
      options: {
        description: `Creates templates`,
        notes: `Create a template ready to be used.`,
        tags: [`api`, `content`, `template`],
        validate: {
          payload: {
            type: joi.string().required(),
            icon: joi.string().required(),
            regions: joi
              .array()
              .items({
                meta: {
                  type: joi
                    .string()
                    .allow('single', 'fluid', 'fixed', 'static')
                    .required(),
                  shared: joi.boolean(),
                  name: joi.string()
                },
                components: joi.array().items(joi.string())
              })
              .required()
          }
        }
      },
      handler: createTemplate
    },
    {
      method: `POST`,
      path: `/content/template/update`,
      options: {
        description: `Updates templates`,
        notes: `Update a template ready to be used.`,
        tags: [`api`, `content`, `template`],
        validate: {
          payload: {
            type: joi.string().required(),
            icon: joi.string().required(),
            regions: joi
              .array()
              .items({
                meta: {
                  type: joi
                    .string()
                    .allow('single', 'fluid', 'fixed', 'static')
                    .required(),
                  shared: joi.boolean(),
                  name: joi.string()
                },
                components: joi.array().items(joi.string())
              })
              .required()
          }
        }
      },
      handler: updateTemplate
    },
    {
      method: `POST`,
      path: `/content/template/delete`,
      options: {
        description: `deletes template`,
        notes: `deletes specified template`,
        tags: [`api`, `content`, `template`],
        validate: {
          payload: {type: joi.string().required()}
        }
      },
      handler: deleteTemplate
    }
  ]);
};
