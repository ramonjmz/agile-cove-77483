const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

var bodyParser = require("body-parser");
	.use(bodyParser.json());
	.use(bodyParser.urlencoded({ extended: true }));


express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .get('/switch', (req, res) => res.render('pages/index'))


   .post('/token-device', function(req, res){
  	res.send(req.body.token);
  });

  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
