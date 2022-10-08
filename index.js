const express = require('express')
const path = require('path')
const app = express()
const port = process.env.Port || 3000;

app.use('/',require(path.join(__dirname,'Routes/Route.js')));

app.listen(port, () => {
    console.log('Express listening on port http://localhost:3000');
});
