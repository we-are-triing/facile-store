import admin from './admin/routes.js';
import content from './content/routes.js';

export default server => {
  [admin, content].forEach(route => route(server));
};
