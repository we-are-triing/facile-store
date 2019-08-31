import {constants, mongo, hasItemByType} from '../../utils/db.js';
import boom from '@hapi/boom';
import joi from '@hapi/joi';
import fetch from 'node-fetch';

const nameReg = /[a-zA-Z0-9 _\-]+/;

const nameValidation = joi
  .string()
  .regex(nameReg)
  .required();

const mediaValidation = joi.object({
  tags: joi.array().items(joi.string()),
  name: nameValidation,
  filename: nameValidation,
  meta: joi.object({
    name: joi.string(),
    lastModified: joi.number(),
    size: joi.number(),
    type: joi.string()
  }),
  master: nameValidation
});

const filenameValidation = {
  filename: nameValidation
};

export default server => {
  server.route([
    {
      method: `GET`,
      path: `/media`,
      options: {
        description: `Gets all information for all media asset.`,
        notes: `this returns an array of every media object.`,
        tags: [`api`, `media`]
      },
      handler: async (req, h) => {
        try {
          return mongo(async db => {
            const collection = db.collection(constants.media);
            return await collection.find({}).toArray();
          });
        } catch (err) {
          console.error(``, err);
          return boom.badImplementation(`something done broke`);
        }
      }
    },
    {
      method: `GET`,
      path: `/media/{filename}`,
      options: {
        description: `Gets the information of a media asset.`,
        notes: `This returns only the meta data based on the key of the filename. Filename needs to be unique.`,
        tags: [`api`, `media`],
        validate: {
          params: filenameValidation
        }
      },
      handler: async (req, h) => {
        try {
          const {filename} = req.params;
          return mongo(async db => {
            const collection = db.collection(constants.media);
            return await collection.find({filename}).toArray();
          });
        } catch (err) {
          console.error(``, err);
          return boom.badImplementation(`something done broke`);
        }
      }
    },
    {
      method: `DELETE`,
      path: `/media`,
      options: {
        description: `Deletes media item by filename`,
        notes: `This is the generated unique filename, not the user defined name. This should only be called from the media server.`,
        tags: [`api`, `media`],
        validate: {
          payload: filenameValidation
        }
      },
      handler: async (req, h) => {
        try {
          const {filename} = req.payload;
          const derivatives = mongo(async db => {
            const collection = db.collection(constants.media);
            return collection.find({master: filename}).toArray();
          });
          if (derivatives.length > 0) {
            // TODO: get better URL stragedy.
            const temp = derivatives.map(async media =>
              fetch(`http://localhost:8002/media`, {
                headers: {'Content-Type': 'application/json'},
                method: 'DELETE',
                body: {filename: media.filename}
              })
            );

            await Promise.all(temp);
          }

          return mongo(async db => {
            const collection = db.collection(constants.media);
            return await collection.deleteOne({filename});
          });
        } catch (err) {
          console.error(``, err);
          return boom.badImplementation(`something done broke`);
        }
      }
    },
    {
      method: `POST`,
      path: `/media`,
      options: {
        description: `Save the information for a media asset`,
        notes: `this is just for metadata an not for the media itself. The filename is the key. Run as an upsert.`,
        tags: [`api`, `media`],
        validate: {
          payload: mediaValidation
        }
      },
      handler: async req => {
        try {
          return mongo(async db => {
            const {filename, meta = '', tags = [], name, master = 'self'} = req.payload;
            const collection = db.collection(constants.media);
            return await collection.replaceOne({filename}, {filename, meta, tags, name, master}, {upsert: true});
          });
        } catch (err) {
          console.error(``, err);
          return boom.badImplementation(`something done broke`);
        }
      }
    }
  ]);
};
