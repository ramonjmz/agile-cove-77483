const express = require('express')
const app = express()
const path = require('path')
const PORT = process.env.PORT || 5000

var bodyParser = require("body-parser");
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: true }));


express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  app.get('/', (req, res) => res.render('pages/index'))
  app.get('/switch', (req, res) => res.render('pages/index'))
  app.post('/token-device', function(req, res){
  	res.send(req.body.token);
  });

  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
