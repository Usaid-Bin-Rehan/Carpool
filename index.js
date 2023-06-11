const express = require('express')
const path = require('path')
const app = express()
const bodyParser = require('body-parser');
const router = express.Router();
const staticPath = path.join(__dirname,'../Templates');
const urlencodedParser = bodyParser.urlencoded({ extended: true });
const home = require(path.join(__dirname,'Routes/Route.js'));
const port = process.env.Port || 4000;

app.use('/',home);
app.set('views', path.join(__dirname, 'Templates'));
app.set('view engine', 'ejs');


app.listen(port, () => {
    console.log('Express listening on port http://localhost:4000');
});
