import joi from '@hapi/joi';
import * as templates from './templates.js';
import * as components from './components.js';
import * as content from './content.js';

const componentTemplateValidation = {
  meta: joi.object({
    type: joi.string().required(),
    icon: joi.string().required(),
    tags: joi.array().items(joi.string())
  }),
  values: joi.array().items(
    joi
      .object({
        name: joi
          .string()
          .regex(/[a-zA-Z0-9 _-]/)
          .required(),
        type: joi
          .string()
          .valid(`string`, `text`, `text_block`, `number`, `boolean`, `object`, `region`, `set`, `list`)
          .required()
      })
      .when(joi.object({type: `region`}).unknown(), {
        then: joi.object({
          region: joi
            .string()
            .valid(`fluid`, `fixed`, `single`, `static`)
            .required(),
          components: joi.array().items(joi.string())
        })
      })
  )
};

const typeValidation = {
  type: joi.string().required()
};

const nameValidation = {
  name: joi.string().required()
};

const contentValidation = {
  meta: joi.object({
    name: joi
      .string()
      .regex(/[a-zA-Z0-9 _-]/)
      .required(),
    type: joi
      .string()
      .regex(/[a-zA-Z0-9 _-]/)
      .required(),
    slug: joi
      .string()
      .regex(/[a-zA-Z0-9_-]/)
      .required(),
    path: joi.array().items(joi.string()),
    menu: joi.array().items(joi.string()),
    tags: joi.array().items(joi.string()),
    publish_date: joi.date(),
    status: joi
      .string()
      .valid('draft', 'scheduled', 'published')
      .required(),
    approvals: joi.object({
      editor: {userID: joi.string(), date: joi.date()},
      designer: {userID: joi.string(), date: joi.date()},
      translator: {userID: joi.string(), date: joi.date()}
    })
  }),
  values: joi.array().items({
    name: joi.string(),
    value: joi.string()
  }),
  regions: joi.array().items({
    meta: joi.object(),
    values: joi.array(),
    regions: joi.array()
  })
};

const templateRoutes = server => {
  server.route([
    {
      method: `GET`,
      path: `/templates`,
      options: {
        description: `Get all templates`,
        notes: `this is not the content, but the templates to fill out.`,
        tags: [`api`, `content`, `template`]
      },
      handler: templates.getAll
    },
    {
      method: `GET`,
      path: `/template/{type}`,
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
      path: `/template/create`,
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
      path: `/template/update`,
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
      method: `DELETE`,
      path: `/template/delete`,
      options: {
        description: `deletes template`,
        notes: `deletes specified template`,
        tags: [`api`, `content`, `template`],
        validate: {
          payload: typeValidation
        }
      },
      handler: templates.del
    }
  ]);
};
const componentRoutes = server => {
  server.route([
    {
      method: `GET`,
      path: `/components`,
      options: {
        description: `Get all components`,
        notes: `this is not the content, but the components to fill out.`,
        tags: [`api`, `content`, `component`]
      },
      handler: components.getAll
    },
    {
      method: `GET`,
      path: `/component/{type}`,
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
      path: `/component/create`,
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
      path: `/component/update`,
      options: {
        description: `Updates component`,
        notes: `Update a component ready to be used.`,
        tags: [`api`, `content`, `component`],
        validate: {
          payload: componentTemplateValidation
        }
      },
      handler: components.update
    },
    {
      method: `DELETE`,
      path: `/component/delete`,
      options: {
        description: `deletes component`,
        notes: `deletes specified component`,
        tags: [`api`, `content`, `component`],
        validate: {
          payload: typeValidation
        }
      },
      handler: components.del
    }
  ]);
};
const contentRoutes = server => {
  server.route([
    {
      method: `GET`,
      path: `/content`,
      options: {
        description: `Get all content`,
        notes: `Returns a list of all content.`,
        tags: [`api`, `content`]
      },
      handler: content.getAll
    },
    {
      method: `GET`,
      path: `/content/{name}`,
      options: {
        description: `Get content by name`,
        notes: `This gets the content item by assigned name.`,
        tags: [`api`, `content`],
        validate: {
          params: nameValidation
        }
      },
      handler: content.get
    },
    {
      method: `POST`,
      path: `/content/create`,
      options: {
        description: `Creates content`,
        notes: `Create content ready to be delivered.`,
        tags: [`api`, `content`, `components`],
        validate: {
          payload: contentValidation
        }
      },
      handler: content.create
    },
    {
      method: `POST`,
      path: `/content/update`,
      options: {
        description: `Updates content`,
        notes: `Update content.`,
        tags: [`api`, `content`],
        validate: {
          payload: contentValidation
        }
      },
      handler: content.update
    },
    {
      method: `DELETE`,
      path: `/content/delete`,
      options: {
        description: `deletes content`,
        notes: `deletes specified content`,
        tags: [`api`, `content`],
        validate: {
          payload: nameValidation
        }
      },
      handler: content.del
    }
  ]);
};

export default server => {
  templateRoutes(server);
  componentRoutes(server);
  contentRoutes(server);
};
