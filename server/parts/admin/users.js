import {mongo} from '../../utils/db.js';

export const getAllUsers = async (req, h) => {
  return mongo(async db => {
    const users = db.collection('users');
    return await users.find({}).toArray();
  });
};

export const registerUsers = async (req, h) => {
  return mongo(async db => {
    const users = db.collection('users');
    const {name} = req.payload;
    return await users.insertOne({name});
  });
};

/* 
all roles inherit all abilities below them. IE an editor has all the ability of designer, author but not an admin.
roles:
- admin
  - edit user and site data
- editor
  - approves content for publishing
- designer
  - creates templates
- author
  - uses templates
- translator*
  - sees translation interface for a single or set of languages.

* translator is a special role that can be applied to other roles for a particular language or set of langugages. Only the admin has access to all translation ability unless specifically assigned.
*/
