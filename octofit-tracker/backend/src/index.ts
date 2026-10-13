import { connectDatabase } from './config/database.js';
import app, { baseUrl, port } from './server.js';

async function startServer(): Promise<void> {
  await connectDatabase();
  app.listen(port, () => {
    console.log(`OctoFit API available at ${baseUrl}`);
  });
}

startServer().catch((error: unknown) => {
  console.error('Unable to start OctoFit API:', error);
  process.exitCode = 1;
});
