import app from './index';
import { express } from '../config';

const { host, port } = express;

app.listen(port, host, (error) => {
  if (error) {
    console.error(error);
    process.exit(10);
  }

  console.log(`express is listening on http://${host}:${port}`);
});
