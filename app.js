const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./src/Configs/db'); 
const app = express();
const port = 9000;

app.use(bodyParser.json());
app.use(cors());

db.execute('SELECT 1') 
  .then(() => {
    console.log('Connected to the database!');

    const router = require('./src/routes');
    app.use('/api', router);

    app.listen(port, () => {
      console.log(`Server is running at http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error('Error connecting to the database:', err.message);
    throw err;
  });
