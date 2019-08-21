import {constants, mongo} from '../../utils/db.js';
import boom from '@hapi/boom';

export const getById = async ({params}) => {
  const {id} = params;
  const arr = await queryById(id);
  return send(arr[0]);
};

export const getByPath = async ({params}) => {
  const {path} = params;
  const arr = await queryByPath(path.join('/'));
  return send(arr[0]);
};

const send = content => {
  const status = getStatus(content.meta.publish_date);

  // TODO: add approvals check
  if (status !== 'published') {
    return boom.notFound(`It isn't here or isn't ready to show.`);
  }
  // TODO: merge the media in. I want to store the media as an ID, not a URL, but the interface currently is a URL.
  const {meta, values = {}, regions = []} = content;
  return {
    meta: {
      type: meta.type,
      menu: meta.menu
    },
    values,
    regions
  };
};

const getStatus = date => {
  const d = new Date();
  const today = d.getTime();
  const d2 = new Date(date);
  const pub = d2.getTime();

  if (pub === NaN || pub === 0) {
    return 'draft';
  } else if (pub > today) {
    return 'scheduled';
  } else {
    return 'published';
  }
};

const query = async (q = {}) => {
  return mongo(async db => {
    const content = db.collection(constants.content);
    return await content.find(q).toArray();
  });
};

const queryById = async id => query({'meta.name': id});
const queryByPath = async path => query({'meta.path': path});
