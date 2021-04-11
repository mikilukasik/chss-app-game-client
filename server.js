const express = require('express');
const app = express();

app.use(express.static('build'));
app.listen(3000);

console.log(`App is listening on port 3000`);

// debug below
const fs = require('fs');
fs.readdir('.', (err, files) => {
  if (err) return console.error(err);
  
  files.forEach(file => {
    console.log(file);
  });
});
