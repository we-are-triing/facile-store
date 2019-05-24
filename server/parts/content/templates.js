import {mongo} from '../../utils/db.js';
import boom from '@hapi/boom';

const constants = {
  templates: `templates`
};

export const getTemplates = async (req, h) => {
  return mongo(async db => {
    const templates = db.collection(constants.templates);
    return await templates.find({}).toArray();
  });
};

export const getTemplate = async (req, h) => {
  return mongo(async db => {
    const {type} = req.params;
    const templates = db.collection(constants.templates);
    return await templates.find({'meta.type': type}).toArray();
  });
};

export const createTemplate = async (req, h) => {
  return mongo(async db => {
    const {type, icon, regions} = req.payload;
    const templates = db.collection(constants.templates);
    const temp = await templates.find({'meta.type': type}).toArray();
    const exists = temp.length > 0;
    if (exists) {
      return boom.badRequest(`Template already exists`, {type, icon, regions});
    }
    return await templates.insertOne({
      meta: {
        type,
        icon
      },
      regions
    });
  });
};

export const updateTemplate = async (req, h) => {
  return mongo(async db => {
    const {type, icon, regions} = req.payload;
    const templates = db.collection(constants.templates);
    return await templates.find({}).toArray();
  });
};

export const deleteTemplate = async (req, h) => {
  return mongo(async db => {
    const {type} = req.payload;
    const templates = db.collection(constants.templates);
    return await templates.deleteOne({'meta.type': type});
  });
};

/* 

Template & region structure 
a template is a component, with some specific opinions.
- specific meta data
- a set of regions


{
  meta: {
    type: string, // needs to be unique, used as a key. (used as a type of template),
    icon: path, // this is the image that will represent the template type in the UI. // will provide some default ones to choose from.
    name: string, // needs to be unique, used as a key. (used in an instance of a template),
    img: uri, // uri would be the key for media.
    slug: key,
    path: [key], // this would be the url path
    nav: [string], // this is the array of parents in the navigation, 
    tags: [string], //
    approvals: [{role, user, data}], // for the content side. but not sent
  },
  values: {
    // This would be a set of values that would be used in the head section of the template for seo and such
    // we can suggest a basic set, but this can be altered like a component.
    // although I think in the template, there are a few that will be required.
      title: ,
      description: ,
      image: ,
      slug: 
  },
  regions: [
    {
      meta: {
        type: 
          'single', // may only have a single or multiple componeont choices, but you can only display one of the options. An example would be a title area that could have different types of introductions to an article, many options, but only one can exists in content.
          'fluid', // has one or more components to choose, and you can add as many as you want in any order in the content area. An example would be the content of an article, content, media, asides, videos, can all exists, and you can put as many as you want in any order, but there is a limited set of options to choose from.
          'fixed', // Has a set number and order of components to fill out. You can't add or arrange any of them, just fill them in. An example might be the author bio section of an article.
          'static' // this is similar to fixed, in that there is no change to the compoennt, the only difference is that this componeont is already fillout out, so the content doesn't change through instances. An example might be a slogan, or a copyright / privacy policy / terms link set.
        ,
        name: string // needs to be unique, used as a key. if a shared region the use needs to define this, if it is a single instance, we will generate.
      },
      components: ['componentType'], // an array of allowed components by name.
      content: [] // filled out components. 
    }
  ]  
}

*/
