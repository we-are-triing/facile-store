import * as common from './common.js';

export const create = async ({payload}) => common.createTemplate(payload);
export const getAll = async () => common.getTemplates();
export const get = async ({params}) => common.getTemplate(params.type);
export const update = async ({payload}) => common.updateTemplate(payload);
export const del = async ({payload}) => common.deleteTemplate(payload.type);

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
    tags: [string]
  },
  values: {
    // This would be a set of values that would be used in the head section of the template for seo and such
    // we can suggest a basic set, but this can be altered like a component.
    // although I think in the template, there are a few that will be required.
      title: ,
      description: ,
      image: ,
      region: 
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
    
  },
    
}

*/
