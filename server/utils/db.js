import mongodb from 'mongodb';

const MongoClient = mongodb.MongoClient;
const dbName = `facile`;
const dbUrl = `mongodb://db:27017`;
const options = {useNewUrlParser: true};
const client = new MongoClient(dbUrl, options);

const connect = async () => {
  try {
    await client.connect();
    console.info('app is connected to the DB');
  } catch (err) {
    setTimeout(connect, 2000);
    console.error('app did not connect to the DB:', err);
  }
};

export const constants = {
  templates: `templates`,
  components: `components`,
  users: `users`
};

export const mongo = async (func, error) => {
  if (!error) error = err => console.error(err);
  const db = client.db(dbName);
  let reply;
  try {
    reply = await func(db);
  } catch (err) {
    error(err);
    reply = err;
  }
  return reply;
};

export const hasItem = async (collection, query) => {
  const temp = await collection.find(query).toArray();
  return temp.length > 0;
};

export const hasItemByType = async (collection, type) => await hasItem(collection, {'meta.type': type});

export const hasItemByName = async (collection, name) => await hasItem(collection, {'meta.name': name});

connect();
