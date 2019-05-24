import mongodb from 'mongodb';

const MongoClient = mongodb.MongoClient;
const dbName = `facile`;
const dbUrl = `mongodb://db:27017`;
const options = {useNewUrlParser: true};
const client = new MongoClient(dbUrl, options);

client.connect();

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
