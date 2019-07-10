import admin from './admin/routes.js';
import content from './content/routes.js';
import media from './media/routes.js';

export default server => {
  [admin, content, media].forEach(route => route(server));
};
