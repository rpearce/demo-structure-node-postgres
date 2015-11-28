import app from './index';
import { expressPort } from '../config';

app.listen(expressPort, (error) => {
  if (error) {
    console.error(error);
    process.exit(10);
  }

  console.log(`express is listening on http://localhost:${expressPort}`);
});
