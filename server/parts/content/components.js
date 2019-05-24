import {mongo} from '../../utils/db.js';

export const init = async (req, h) => {
  return mongo(async db => {
    const users = db.collection('users');
    const {name} = req.payload;
    return await users.insertOne({name});
  });
};

/* 

Component data structure:

{
  meta: {
    name: string,
    type: string // needs to be unique, used as a key. (used in an instance of a template)
  },
  values: {
    prop: val,
    // these are the primatives that make up the values that can exist here.
    token: a string that takes a specific set of chars. (a-zA-Z_0-9) but can't start with a number.
    uri: a path, absolute, relative, url.
    string:  no formatting, only a string of text
    text: rich text formatting only inline elements allowed, see text component.
    text block: rich text formatting block elements allowed, see text block component.
    number: a number, could have a decimal, but a typical number.
    boolean: true or false
    object: a json object { prop: val }
    (limited set): indicates there is a finite number of options available.
    [type]: An array of Type.

  },
  regions: [] // this uses a region to populate the content.
}

provided components:
- navigation

*/
