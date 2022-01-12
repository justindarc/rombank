import 'dotenv/config';
import '@/index';
import App from '@/app';
import AuthRoutes from '@routes/auth.routes';
import DATFilesRoutes from '@routes/datfiles.routes';
import FilesRoutes from '@routes/files.routes';
import IndexRoutes from '@routes/index.routes';
import ROMSetsRoutes from '@routes/romsets.routes';
import UsersRoutes from '@routes/users.routes';
import validateEnv from '@utils/validateEnv';

validateEnv();

const app = new App([
  new DATFilesRoutes(),
  new FilesRoutes(),
  new ROMSetsRoutes(),
  new UsersRoutes(),
  new AuthRoutes(),

  // `IndexRoutes` must be last to catch all other routes via wildcard.
  new IndexRoutes(),
]);

app.listen();
