const express = require('express');
const config = require('./config');
const routes = require('./routes');

const app = express();

function startServer() {
  // Transforms the raw string of req.body into json
  app.use(express.json());

  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../../client/public/index.html'));
  });

  // Load API routes
  app.use(config.api.prefix, routes);

  /// catch 404 and forward to error handler
  app.use((req, res, next) => {
    const err = new Error('Not Found');
    err['status'] = 404;
    next(err);
  });

  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
      errors: {
        message: err.message,
      },
    });
  });
  console.log('here');
  app
    .listen(config.port, () => {
      console.log(`
    ################################################
    🛡️  Server listening on port: ${config.port} 🛡️
    ################################################
  `);
    })
    .on('error', (err) => {
      console.error(err);
      process.exit(1);
    });
}
startServer();
