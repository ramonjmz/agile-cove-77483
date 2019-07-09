const cool = require('cool-ascii-faces')
const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

const bodyParser = require("body-parser");

express()
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: true }))
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .get('/cool', (req, res) => res.send(cool()))
  .get('/token-devices', (req, res) => res.send(req.body.token))
  .get('/switch/:ping?', (req, res) => res.json({
            data: req.params.ping}))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))

  console.dir(req.hostname)
  console.dir(req.ip)
  console.dir(req.params.name)

  
