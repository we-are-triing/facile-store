import joi from '@hapi/joi';
import * as templates from './templates.js';
import * as components from './components.js';

const componentTemplateValidation = {
  type: joi.string().required(),
  icon: joi.string().required(),
  tags: joi.array().items(joi.string()),
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
};

const typeValidation = {
  type: joi.string().required()
};

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
      handler: templates.getAll
    },
    {
      method: `GET`,
      path: `/content/template/{type}`,
      options: {
        description: `Get template by type`,
        notes: `this is not the content, but the template to fill out.`,
        tags: [`api`, `content`, `template`],
        validate: {
          params: typeValidation
        }
      },
      handler: templates.get
    },
    {
      method: `POST`,
      path: `/content/template/create`,
      options: {
        description: `Creates templates`,
        notes: `Create a template ready to be used.`,
        tags: [`api`, `content`, `template`],
        validate: {
          payload: componentTemplateValidation
        }
      },
      handler: templates.create
    },
    {
      method: `POST`,
      path: `/content/template/update/{type}`,
      options: {
        description: `Updates templates`,
        notes: `Update a template ready to be used.`,
        tags: [`api`, `content`, `template`],
        validate: {
          payload: componentTemplateValidation
        }
      },
      handler: templates.update
    },
    {
      method: `POST`,
      path: `/content/template/delete`,
      options: {
        description: `deletes template`,
        notes: `deletes specified template`,
        tags: [`api`, `content`, `template`],
        validate: {
          payload: typeValidation
        }
      },
      handler: templates.del
    },
    {
      method: `GET`,
      path: `/content/components`,
      options: {
        description: `Get all components`,
        notes: `this is not the content, but the components to fill out.`,
        tags: [`api`, `content`, `component`]
      },
      handler: components.getAll
    },
    {
      method: `GET`,
      path: `/content/component/{type}`,
      options: {
        description: `Get component by type`,
        notes: `this is not the content, but the component to fill out.`,
        tags: [`api`, `content`, `component`],
        validate: {
          params: typeValidation
        }
      },
      handler: components.get
    },
    {
      method: `POST`,
      path: `/content/component/create`,
      options: {
        description: `Creates component`,
        notes: `Create a component ready to be used.`,
        tags: [`api`, `content`, `components`],
        validate: {
          payload: componentTemplateValidation
        }
      },
      handler: components.create
    },
    {
      method: `POST`,
      path: `/content/component/update/{type}`,
      options: {
        description: `Updates component`,
        notes: `Update a template ready to be used.`,
        tags: [`api`, `content`, `template`],
        validate: {
          payload: componentTemplateValidation
        }
      },
      handler: components.update
    },
    {
      method: `POST`,
      path: `/content/component/delete`,
      options: {
        description: `deletes template`,
        notes: `deletes specified template`,
        tags: [`api`, `content`, `template`],
        validate: {
          payload: typeValidation
        }
      },
      handler: components.del
    }
  ]);
};
