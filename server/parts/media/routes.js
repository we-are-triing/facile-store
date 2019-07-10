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
  name: nameValidation
};

export default server => {
  server.route([
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
        } catch (err) {
          console.error(``, err);
          return fourOFour();
        }
      }
    },
    {
      method: `POST`,
      path: `/media/{filename}`,
      options: {
        description: `Save the information for a media asset`,
        notes: `this is just for metadata an not for the media itself. The filename is the key`,
        tags: [`api`, `media`],
        validate: {
          payload: mediaValidation
        }
      },
      handler: async (req, h) => {
        try {
        } catch (err) {
          console.error(``, err);
          return `fourOFour()`;
        }
      }
    }
  ]);
};
