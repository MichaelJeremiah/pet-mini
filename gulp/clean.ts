import { distPath, sourcemapsPath } from './sourcePath';

import del from 'del';
import path from 'path';

export const cleanDistDir = async () => {
    return await del([
        path.join(__dirname, '..', distPath),
        path.join(__dirname, sourcemapsPath)
    ]);
};
