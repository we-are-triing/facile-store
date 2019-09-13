import {mongo, constants} from '../../utils/db.js';

export const getAllUsers = async (req, h) => {
  return mongo(async db => {
    const users = db.collection(constants.users);
    return await users.find({}).toArray();
  });
};

export const getUser = async req => {
  return mongo(async db => {
    const {id} = req.params;
    const users = db.collection(constants.users);
    const user = await users.find({id}).toArray();
    return user[0];
  });
};

export const registerUser = async (req, h) => {
  return mongo(async db => {
    const users = db.collection(constants.users);
    const {id, profile, roles, admin, translator} = req.payload;
    return await users.insertOne({
      id,
      profile,
      roles,
      admin,
      translator
    });
  });
};

export const checkAdmin = async (req, h) => {
  return mongo(async db => {
    const users = db.collection(constants.users);
    const res = await users.find().toArray();
    return res.length > 0;
  });
};
/*
{
id: 
profile: {
  name:
  email:
  img:
}
roles: //editor, designer, author
admin
translator: []
}
*/

/* 
all roles inherit all abilities below them. IE an editor has all the ability of designer, author but not an admin.
roles:
- admin*
  - edit user and site data
- editor
  - approves content for publishing
- designer
  - creates templates
- author
  - uses templates
- translator*
  - sees translation interface for a single or set of languages.

* translator and admin are special roles that can be applied to other roles 
* translator can be applid for a particular language or set of langugages.
*/
