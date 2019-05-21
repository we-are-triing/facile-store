import Hapi from "@hapi/hapi";
import Inert from "@hapi/inert";
import routes from "./routes.js";

//Keeping these in as a reference to support http2
// import http2 from 'http2';
// import {readFileSync} from 'fs';

// const options = {
//     key: readFileSync('server.key'),
//     cert: readFileSync('server.crt')
// }

const server = Hapi.server({
  // listener: http2.createServer(options),
  port: process.env.PORT || 8001,
  host: process.env.HOST || "0.0.0.0"
});

const init = async () => {
  await server.register(Inert);
  routes(server);
  await server.start();
  console.log(`Server running at: ${server.info.uri}`);
};

process.on("unhandledRejection", err => {
  console.log(err);
  process.exit(1);
});

init();
