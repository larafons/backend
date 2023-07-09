import { fileURLToPath } from 'url';
import { dirname } from 'path';
import bcrypt from 'bcrypt';

//hashea
export const createHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10));

//compara
export const validatePassword = (user, password) => bcrypt.compareSync(password, user.password);

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default __dirname;