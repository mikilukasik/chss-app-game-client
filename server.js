const path = require('path');
const express = require('express');

const app = express();
app.use(express.static(path.resolve('./build')));
app.get('*', (req, res) => {
  res.sendFile(path.resolve('./build/index.html'));
});

app.use(express.static('build'));
app.listen(3000);

console.log(`App is listening on port 3000`);
