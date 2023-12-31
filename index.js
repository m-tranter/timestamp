// index.js

const express = require('express');
const cors = require('cors');
const app = express();

const myLogger = function (req, _, next) {
  console.log(`Incoming: ${req.url}`);
  next();
};

function isNum(value) {
  return /^-?\d+$/.test(value);
}

app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204
app.use(myLogger);
app.use(express.static('public'));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get('/api/:date?', function (req, res) {
  let date = req.params.date;
  let myDate = !date
    ? new Date()
    : new Date(isNum(date) ? parseInt(date) : date);
  let utc = myDate.toUTCString();
  let unix = myDate.getTime();
  res.json(
    utc === 'Invalid Date'
      ? { error: 'Invalid date' }
      : { unix, utc }
  );
});

const port = process.env.PORT ? process.env.PORT : 3001;
const listener = app.listen(port, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
