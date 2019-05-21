import mongodb from "mongodb";

const MongoClient = mongodb.MongoClient;
const dbName = `facile`;
const dbUrl = `mongodb://db:27017`;
const options = { useNewUrlParser: true };
const client = new MongoClient(dbUrl, options);

client.connect();

const dbCall = async (func, error) => {
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

export default server => {
  server.route({
    method: `POST`,
    path: `/register`,
    handler: async (req, h) => {
      return dbCall(async db => {
        const users = db.collection("users");
        const { name } = req.payload;
        return await users.insertOne({ name });
      });
    }
  });
  server.route({
    method: `GET`,
    path: `/users`,
    handler: async (req, h) => {
      return dbCall(async db => {
        const users = db.collection("users");
        return await users.find({}).toArray();
      });
    }
  });
};
