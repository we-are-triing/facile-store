import admin from './admin/routes.js';
import content from './content/routes.js';
import media from './media/routes.js';
import api from './api/routes.js';

export default server => {
  [admin, content, media, api].forEach(route => route(server));
};
