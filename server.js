const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const morgan = require('morgan'); //everytime request is made it will be logged
const router = express.Router();
const appRoutes = require('./app/routes/api')(router);
const app = express();
const port = process.env.PORT || 3000;
const colors = require('colors/safe');


app.use(bodyParser.json());
//app.use(morgan('dev'));
app.use(express.static(__dirname + '/public'));

app.use('/api', appRoutes);

app.get('*', function(req, res){
    res.sendFile(path.join(__dirname + '/public/app/views/index.html'))
});


app.listen(port, function(){
    console.log("Server is running on port " + port);
});