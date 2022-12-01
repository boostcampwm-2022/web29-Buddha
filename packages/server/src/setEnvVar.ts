import { existsSync, readFileSync } from 'fs';
import path from 'path';

const envPath = path.join(process.env.PWD, '.dev.env');
if (!existsSync(envPath)) {
  throw new Error('환경변수 로드가 안됐습니다.');
}
const env = readFileSync(path.join(process.env.PWD, '.dev.env')).toString();

const lines = env.split('\n').filter((el) => el !== '');

lines.forEach((el) => {
  const [key, value] = el.split('=');
  console.log(key, value);

  process.env[key] = value;
});
