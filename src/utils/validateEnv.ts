import { cleanEnv, port, str } from 'envalid';

const validateEnv = () => {
  cleanEnv(process.env, {
    NODE_ENV: str(),
    PORT: port(),
    ROOT_PATH: str(),
    DATFILES_PATH: str({ default: './datfiles' }),
    ROMSETS_PATH: str({ default: './romsets' })
  });
};

export default validateEnv;
