import { existsSync, readFileSync } from 'fs';
import path from 'path';

const TEST_ENV_NAME = '.test.env';
const envPath = path.join(process.env.PWD, TEST_ENV_NAME);
if (!existsSync(envPath)) {
  throw new Error('환경변수 로드가 안됐습니다.');
}
const env = readFileSync(path.join(process.env.PWD, TEST_ENV_NAME)).toString();

const lines = env.split('\n').filter((el) => el !== '');

lines.forEach((el) => {
  const [key, value] = el.split('=');

  process.env[key] = value;
});
