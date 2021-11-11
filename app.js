const { json, urlencoded } = require('express');
const express = require('express');

const app = express();
app.use( json() );
app.use( urlencoded({ extended: true }) );

app.use('/packages', require('./controllers/packages'));
app.use('/shipments', require('./controllers/shipments'));

const port = process.env.PORT || 3000;
app.listen(port, () => console.log('API running on ' + port));