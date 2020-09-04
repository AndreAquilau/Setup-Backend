import '@config/env';
import { createConnection } from 'typeorm';

export default () => {
  return createConnection();
};
