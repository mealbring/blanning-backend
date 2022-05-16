import { Blanning } from './lib/core/Blanning';

const app = new Blanning();

app
  .start()
  .then(() => {
    app.log.info('Application started');
  })
  .catch(() => {
    process.exit(1);
  });
