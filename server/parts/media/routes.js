import {constants, mongo, hasItemByType} from '../../utils/db.js';
import boom from '@hapi/boom';
import joi from '@hapi/joi';

const nameValidation = joi
  .string()
  .regex(/[a-zA-Z0-9 _.-]/)
  .required();

const mediaValidation = joi.object({
  tags: joi.array().items(joi.string()),
  name: nameValidation,
  filename: nameValidation,
  //TODO: figure out what meta data we need to extract from here.
  meta: joi.string(),
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
          return `fourOFour()`;
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
          return `fourOFour()`;
        }
      }
    },
    {
      method: `DELETE`,
      path: `/media`,
      options: {
        description: `Deletes media item by filename`,
        notes: `This is the generated unique filename, not the user defined one.`,
        tags: [`api`, `media`],
        validate: {
          payload: filenameValidation
        }
      },
      handler: async (req, h) => {
        try {
          const {filename} = req.payload;
          return mongo(async db => {
            const collection = db.collection(constants.media);
            return await collection.deleteOne({filename});
          });
        } catch (err) {
          console.error(``, err);
          return `fourOFour()`;
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
      handler: async ({params, payload}, h) => {
        try {
          return mongo(async db => {
            const {filename, meta = '', tags = [], name, master = 'self'} = payload;
            const collection = db.collection(constants.media);
            return await collection.replaceOne({filename}, {filename, meta, tags, name, master}, {upsert: true});
          });
        } catch (err) {
          console.error(``, err);
          return `fourOFour()`;
        }
      }
    }
  ]);
};
