

import multer from 'multer';
import path, { dirname } from 'path';

const filePath = path.join('__dirname' , '../uploads');
export const upload = multer({ dest: filePath})