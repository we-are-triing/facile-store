import * as common from './common.js';

export const create = async ({payload}) => common.createComponent(payload);
export const getAll = async () => common.getComponents();
export const get = async ({params}) => common.getComponent(params.type);
export const update = async ({payload}) => common.updateComponent(payload);
export const del = async ({payload}) => common.deleteComponent(payload.type);

/* 

Component data structure:

{
  meta: {
    name: string,
    type: string // needs to be unique, used as a key. (used in an instance of a template)
    icon: 
    tags: [string]
  },
  values: [
    prop: type,
    // these are the primatives that make up the values that can exist here.
    token: a string that takes a specific set of chars. (a-zA-Z_0-9) but can't start with a number.
    uri: a path, absolute, relative, url.
    media: link to a media item in the media set
    content: link to content in the cms
    string:  no formatting, only a string of text
    text: rich text formatting only inline elements allowed, see text component.
    text block: rich text formatting block elements allowed, see text block component.
    number: a number, could have a decimal, but a typical number.
    boolean: true or false
    object: a json object { prop: val }
    (limited set): indicates there is a finite number of options available.
    [type]: An array of Type.
    region: can put a region in a component
  ],
  regions: [] // this uses a region to populate the content.
}

provided components:
- navigation

*/
