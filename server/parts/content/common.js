import {constants, mongo, hasItemByType} from '../../utils/db.js';
import boom from '@hapi/boom';

const create = async (tc, payload) => {
  return mongo(async db => {
    const {meta, values} = payload;
    const {type} = meta;
    const collection = db.collection(tc);

    if (await hasItemByType(collection, type)) {
      return boom.badRequest(`${tc} already exists`, {meta, values});
    }
    return await collection.insertOne({meta, values});
  });
};

const query = async (tc, q = {}) => {
  return mongo(async db => {
    const collection = db.collection(tc);
    return await collection.find(q).toArray();
  });
};

const getAll = async tc => query(tc);

const get = async (tc, type) => {
  return query(tc, {'meta.type': type});
};

const update = async (tc, payload) => {
  return mongo(async db => {
    const {meta, values} = payload;
    const {type} = meta;
    const collection = db.collection(tc);

    return await collection.replaceOne({'meta.type': type}, {meta, values});
  });
};

const del = async (tc, type) => {
  return mongo(async db => {
    const collection = db.collection(tc);
    return await collection.deleteOne({'meta.type': type});
  });
};

export const createTemplate = async payload => create(constants.templates, payload);
export const createComponent = async payload => create(constants.components, payload);

export const updateTemplate = async payload => update(constants.templates, payload);
export const updateComponent = async payload => update(constants.components, payload);

export const deleteTemplate = async type => del(constants.templates, type);
export const deleteComponent = async type => del(constants.components, type);

export const getTemplates = async () => getAll(constants.templates);
export const getComponents = async () => getAll(constants.components);

export const getTemplate = async type => get(constants.templates, type);
export const getComponent = async type => get(constants.components, type);
