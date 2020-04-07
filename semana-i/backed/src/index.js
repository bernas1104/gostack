const express = require('express');

const app = express();

app.use('/', (req, res) => {
  return res.json({
    hello: "Hello, GoStack #11!"
  });
});

app.listen(3000, () => {
  console.log('Server is running...🚀 ');
});